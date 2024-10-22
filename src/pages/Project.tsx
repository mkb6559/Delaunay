import { useState } from "react";
import { Canvas } from "../scripts/delaunay";

const Project = () => {
    
  const coords= useState<number[]>([])
  const mode= useState<boolean>(true)

  const handleClear = () => {
    coords[1]([])
  };
  const handleMode = () => {
    mode[1](!mode[0])
  };

    return (
        <div>
            <p>Project</p>
            <div>
            <Canvas props={coords} mode={mode}></Canvas>
            
            </div>
            <button type="button" onClick={handleClear}>
            clear
            </button>
            <button type="button" onClick={handleMode}>
            swap modes
            </button>
        </div>
    )
}

export default Project;