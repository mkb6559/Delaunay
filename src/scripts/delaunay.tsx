import {useEffect, useRef } from 'react'
import Delaunator from 'delaunator';




export function Canvas(props: {props:[any, any]}) {
  
  const [coords,setCoords] = props.props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const makePoint = (event: { clientX: number; clientY: number; }) => {

    const x = event.clientX;
    const y = event.clientY;

    console.log("hello")
    setCoords(coords.concat([x,y]))
    console.log(coords.concat([x,y]))
  };

  const draw = (context:CanvasRenderingContext2D, rect:DOMRect) =>{
    



    for (let i = 0; i < coords.length-1; i+=2) {
        context?.beginPath();
        context?.arc(coords[i]-rect.left,coords[i+1]-rect.top, 2, 0, 2 * Math.PI);
        context?.fill();
    }

    
    const delaunay = new Delaunator(coords);
    
    console.log(delaunay.triangles);
    if (delaunay.triangles !== undefined){
        for (let i = 0; i < delaunay.triangles.length-2; i+=3) {
            var p1 = delaunay.triangles[i]
            var p2 = delaunay.triangles[i+1]
            var p3 =delaunay.triangles[i+2]
            context?.beginPath();
            context?.moveTo(coords[2*p1]-rect.left, coords[2*p1+1]-rect.top);
            context?.lineTo(coords[2*p2]-rect.left, coords[2*p2+1]-rect.top);
            context?.lineTo(coords[2*p3]-rect.left, coords[2*p3+1]-rect.top);
            context?.lineTo(coords[2*p1]-rect.left, coords[2*p1+1]-rect.top);
            context?.stroke();
        }
    }
  }



  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    console.log(coords)

    const rect = canvas?.getBoundingClientRect();
    if (rect === undefined){
      return
    }
    context?.clearRect(0, 0, rect.width, rect.height);
    if (context !== null && context !== undefined)
      draw(context,rect);
    
  },[coords])

  return <canvas width="650" height="650" ref={canvasRef} {...props} onMouseDown={makePoint} />
}


