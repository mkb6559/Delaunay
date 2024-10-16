import { useState } from "react";
import { Canvas } from "../scripts/delaunay";

const Project = () => {
    
  const coords= useState<number[]>([])
  console.log("hereagain")
    return (
        <div>
            <p>Project</p>
            <Canvas props={coords}></Canvas>
        </div>
    )
}

export default Project;