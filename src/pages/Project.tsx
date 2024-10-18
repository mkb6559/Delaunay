import { useState } from "react";
import { Canvas } from "../scripts/delaunay";

const Project = () => {
    
  const coords= useState<number[]>([100,80,120,100,100,100])
    return (
        <div>
            <p>Project</p>
            <Canvas props={coords}></Canvas>
        </div>
    )
}

export default Project;