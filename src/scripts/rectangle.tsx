import {useRef } from 'react'
import Delaunator from 'delaunator';




export function Canvas(props: {props:[any, any]}) {
    
  const [coords,setCoords] = props.props
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

  const draw = (event: { clientX: number; clientY: number; }) => {
    const rect = canvas?.getBoundingClientRect();
    if (rect === undefined){
      return
    }

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log("hello")
    setCoords(coords.concat([x,y]))
    console.log(coords.concat([x,y]))
  };


  const drawDelaunay = () =>{
    console.log(coords)
                
    for (let i = 0; i < coords.length-1; i+=2) {
        context?.beginPath();
        context?.arc(coords[i],coords[i+1], 2, 0, 2 * Math.PI);
        context?.fill();
        console.log("here")
    }
  
    
    const delaunay = new Delaunator(coords);
    
    console.log(delaunay.triangles);
    if (delaunay.triangles !== undefined){
        for (let i = 0; i < delaunay.triangles.length-2; i+=4) {
            console.log("there")
            var p1 = delaunay.triangles[i]
            var p2 = delaunay.triangles[i+1]
            var p3 =delaunay.triangles[i+2]
            context?.beginPath();
            context?.moveTo(coords[2*p1], coords[2*p1+1]);
            context?.lineTo(coords[2*p2], coords[2*p2+1]);
            context?.lineTo(coords[2*p3], coords[2*p3+1]);
            context?.lineTo(coords[2*p1], coords[2*p1+1]);
            context?.stroke();
        }
    }
  }

  return <canvas ref={canvasRef} onMouseDown={draw} onMouseUp={drawDelaunay}/>
}


