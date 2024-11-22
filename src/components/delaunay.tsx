import {useEffect, useRef, useState } from 'react'
import Delaunator from 'delaunator';




function circumcenter(a: any[],b: any[],c: any[]) : number[]{
  const ad = a[0] * a[0] + a[1] * a[1];
  const bd = b[0] * b[0] + b[1] * b[1];
  const cd = c[0] * c[0] + c[1] * c[1];
  const D = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  return [
      1 / D * (ad * (b[1] - c[1]) + bd * (c[1] - a[1]) + cd * (a[1] - b[1])),
      1 / D * (ad * (c[0] - b[0]) + bd * (a[0] - c[0]) + cd * (b[0] - a[0])),
  ];
}

function getCircumCenter(delaunay: { triangles: { [x: string]: any; }; },coords: any[],i: number): number[]{
  var p1Ind = delaunay.triangles[i]
  var p2Ind = delaunay.triangles[i+1]
  var p3Ind = delaunay.triangles[i+2]
  var point1 = [coords[2*p1Ind],coords[2*p1Ind+1]]
  var point2 = [coords[2*p2Ind],coords[2*p2Ind+1]]
  var point3 = [coords[2*p3Ind],coords[2*p3Ind+1]]
  
  return circumcenter(point1,point2,point3)
}

function sign (p1: number[],p2: number[],p3: number[])
{
    return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1]);
}

function PointInTriangle ( pt: number[],  v1: number[],  v2: number[],  v3: number[])
{
    var d1, d2, d3;
    var has_neg, has_pos;

    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    return !(has_neg && has_pos);
}

function triangleOfEdge(e: number)  { return Math.floor(e / 3); }

function edgesOfTriangle(t: number) { return [3 * t, 3 * t + 1, 3 * t + 2]; }

function trianglesAdjacentToTriangle(delaunay: { halfedges: { [x: string]: any; }; }, t: any) {
    const adjacentTriangles = [];
    for (const e of edgesOfTriangle(t)) {
        const opposite = delaunay.halfedges[e];
        if (opposite >= 0) {
            adjacentTriangles.push(triangleOfEdge(opposite));
        }
    }
    return adjacentTriangles;
}

export function Canvas(props: {props:[any, any],mode:[any,any], right:boolean, circumselected:[any,any], ctrl:[any,any]}) {
  
  const [coords,setCoords] = props.props
  const [modeType,setMode] = props.mode
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedPoint,setSelectedPoint] = useState<number[]>([])
  const [circumSelected,setCircumSelected] = props.circumselected
  var delaunay = new Delaunator(coords)
  const ctrl = props.ctrl[0]
  var height = 0.6 * window.innerHeight
  var width = 0.45 * window.innerWidth
  

  window.addEventListener("resize",()=>{
    setCoords([])
    setCircumSelected([])
  })

  var lastYOffset = window.scrollY
  var lastXOffset = window.scrollX

  
  const updatepoints = ()=>{
    var diffy = -window.scrollY+lastYOffset
    var diffx = -window.scrollX+lastXOffset
    for(var i =0; i<coords.length-1;i+=2){
      coords[i] += diffx
      coords[i+1] += diffy
    }
    setCoords([...coords])
    lastYOffset=window.scrollY
    lastXOffset=window.scrollX
  }


  const selectPoint = (event: {
    button: number; clientX: number; clientY: number; 
}) => {
    
    var x = event.clientX-(props.right ? width : 0);
    var y = event.clientY;
    updatepoints()

    if (ctrl && modeType){
      for(let i = 0; i < delaunay.triangles.length-2; i+=3){
        var p1 = delaunay.triangles[i]
        var p2 = delaunay.triangles[i+1]
        var p3 = delaunay.triangles[i+2]
        

        const pt = [x,y]
        const v1 = [coords[2*p1],coords[2*p1+1]]
        const v2 = [coords[2*p2],coords[2*p2+1]]
        const v3 = [coords[2*p3],coords[2*p3+1]]
        if (PointInTriangle(pt,v1,v2,v3)){
          
          circumSelected[i/3] = !circumSelected[i/3]
          setCircumSelected([...circumSelected])
        }
        
      }
    }else if(!ctrl){
      
      var index =-1;
      for(var i =0; i<coords.length-1;i+=2){
        if (Math.abs(coords[i]-x)<6 && Math.abs(coords[i+1]-y)<6){
          x=i
          y=coords[i+1]
          index = i

          if (event.button === 1) {
            coords.splice(index,2)
            const d = new Delaunator(coords);
            setCircumSelected(Array.from({ length: d.triangles.length }, () => false))
            setCoords([...coords])
            return
          }
          
          
          break
          
        }
      }
      if (index === -1){
        const newCoords = coords.concat([x,y])
        const d = new Delaunator(newCoords);
        setCircumSelected(Array.from({ length: d.triangles.length }, () => false))
        setCoords(newCoords)
      }
      setSelectedPoint([x,y,index])
    }
  };

  const handleMouseMove = (event: { clientX: any; clientY: any; }) => {
    if (selectedPoint.length>2 && selectedPoint[2] !== -1) {
      coords[selectedPoint[2]] = event.clientX
      coords[selectedPoint[2]+1]=  event.clientY
      const d = new Delaunator(coords);
      setCircumSelected(Array.from({ length: d.triangles.length }, () => false))
      setCoords([...coords])
      
    }
  };

  

  const UpdatePoint = () =>{
    setSelectedPoint([])
  }

  const draw = (context:CanvasRenderingContext2D, rect:DOMRect) =>{
    const left = (props.right ? -width : 0)+rect.left
    const top = rect.top
    
    context?.clearRect(0, 0, rect.width, rect.height);
    for (let i = 0; i < coords.length-1; i+=2) {
        context?.beginPath();
        context?.arc(coords[i]-left,coords[i+1]-top, 2, 0, 2 * Math.PI);
        context!.fillStyle = "red";
        context?.fill();
        context!.fillStyle = "black";
    }

    delaunay = new Delaunator(coords)

    if (delaunay.triangles === undefined){
      return
    }

    for (let i = 0; i < delaunay.triangles.length-2; i+=3) {
      var circumCenter1 = getCircumCenter(delaunay,coords,i)
      var p1 = delaunay.triangles[i]

      if (!modeType || circumSelected[i/3]){
        context?.beginPath();
        context?.arc(circumCenter1[0]-left,circumCenter1[1]-top, 2, 0, 2 * Math.PI);
        context!.fillStyle = "blue";
        context?.fill();
        context!.fillStyle = "black";
        context?.stroke();
      }


      if (circumSelected[i/3]){
        var radius = Math.sqrt((coords[2*p1]-circumCenter1[0])**2 + (coords[2*p1+1]-circumCenter1[1])**2)
        context?.beginPath();
        context?.arc(circumCenter1[0]-left,circumCenter1[1]-top, radius, 0, 2 * Math.PI);
        context!.strokeStyle = "blue";
        context?.stroke();
        context!.strokeStyle = "black";
      }
    }

    if (modeType){
      for (let i = 0; i < delaunay.triangles.length-2; i+=3) {
          var p1 = delaunay.triangles[i]
          var p2 = delaunay.triangles[i+1]
          var p3 =delaunay.triangles[i+2]
          context?.beginPath();
          context?.moveTo(coords[2*p1]-left, coords[2*p1+1]-top);
          context?.lineTo(coords[2*p2]-left, coords[2*p2+1]-top);
          context?.lineTo(coords[2*p3]-left, coords[2*p3+1]-top);
          context?.lineTo(coords[2*p1]-left, coords[2*p1+1]-top);
          context?.stroke();
      }
    }
    else{
      for (let i = 0; i < delaunay.triangles.length-2; i+=3) {
        var circumCenter1 = getCircumCenter(delaunay,coords,i)
        var adjacent = trianglesAdjacentToTriangle(delaunay,i/3)
        for (const a of adjacent) {
          var circumCenter2 = getCircumCenter(delaunay,coords,a*3)
          context?.beginPath();
          context?.moveTo(circumCenter1[0]-left, circumCenter1[1]-top);
          context?.lineTo(circumCenter2[0]-left, circumCenter2[1]-top);
          context?.stroke();
        }
        if(adjacent.length<3){
          for (const e of edgesOfTriangle(i/3)) {
            const opposite = delaunay.halfedges[e];
            if (opposite<0){

              var startX = coords[2*delaunay.triangles[e]]
              var startY = coords[2*delaunay.triangles[e]+1]

              var nextEdge= (e+1)%3+i

              var endX = coords[2*delaunay.triangles[nextEdge]]
              var endY = coords[2*delaunay.triangles[nextEdge]+1]

              var nextNextEdge= (nextEdge+1)%3+i

              var otherX = coords[2*delaunay.triangles[nextNextEdge]]
              var otherY = coords[2*delaunay.triangles[nextNextEdge]+1]

              var midx = (startX+endX)/2
              var midy = (startY+endY)/2

              var slope = (midy-circumCenter1[1])/(midx-circumCenter1[0])
              var hullSlope = (endY-startY)/(endX-startX)

              var otherDiff = otherX-startX
              var circumDiff = circumCenter1[0]-startX

              
              context?.moveTo(circumCenter1[0]-left, circumCenter1[1]-top);
              var otherBelow = hullSlope*otherDiff+startY<otherY
              var circumBelow =hullSlope*circumDiff+startY < circumCenter1[1]

              if( (otherBelow && circumBelow) || (!otherBelow && !circumBelow)){
                if (circumCenter1[0]<midx){
                  context?.lineTo(circumCenter1[0]-left + 10000, circumCenter1[1]-top + 10000*slope);
                }
                else{
                  context?.lineTo(circumCenter1[0]-left - 10000, circumCenter1[1]-top + -10000*slope);
                }
              }
              else{
                if (circumCenter1[0]>midx){
                  context?.lineTo(circumCenter1[0]-left + 10000, circumCenter1[1]-top + 10000*slope);
                }
                else{
                  context?.lineTo(circumCenter1[0]-left - 10000, circumCenter1[1]-top + -10000*slope);
                }
              }
              
              context?.stroke();
            }
          }
          
        }
      }
    }
  }



  useEffect(() => {
    height = 0.6 * window.innerHeight
    width = 0.45 * window.innerWidth
    
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');


    const rect = canvas?.getBoundingClientRect();
    if (rect === undefined){
      return
    }
    if (context !== null && context !== undefined)
      draw(context,rect);
    
  },[coords,modeType,circumSelected])

  

  return <canvas  width={width} height={height} ref={canvasRef} {...props} onMouseUp={UpdatePoint} onMouseMove={handleMouseMove} onMouseDown={selectPoint} />
}


