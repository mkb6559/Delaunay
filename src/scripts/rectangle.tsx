import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Delaunator from 'delaunator';
import useMousePosition from "./hooks/useMousePosition";


export function Canvas(props: {props:[any, any]}) {
    
  const [coords,setCoords] = props.props
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const delaunay = new Delaunator(coords);

  useEffect(() => {

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    // Function to draw a circle where the user clicks
    const draw = (event: { clientX: number; clientY: number; }) => {
      const rect = canvas?.getBoundingClientRect();
      if (rect === undefined){
        return
      }

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      console.log("hello")
      setCoords([100,80,120,100,100,100])
    //   console.log(coords)
    //   console.log(coords.concat([x,y]))
    };

    const drawDelaunay = () =>{
        console.log(coords)
                    
        for (let i = 0; i < coords.length-1; i+=2) {
            context?.beginPath();
            context?.arc(coords[i],coords[i+1], 2, 0, 2 * Math.PI);
            context?.fill();
            console.log("here")
        }


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

    // Add the event listener
    canvas?.addEventListener('mousedown', draw);
    canvas?.addEventListener('mouseup', drawDelaunay);


    // Clean up function
    return () => {
      canvas?.removeEventListener('mousedown', draw);
      canvas?.removeEventListener('mouseup',drawDelaunay)
    };

    
  }, [])

  return <canvas ref={canvasRef} />
}


