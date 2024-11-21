import { useState } from "react";
import { Canvas } from "../components/delaunay";
import TabBox from "../components/TabBox"

const Project = () => {
    
  const coords = useState<number[]>([])
  const circumselected = useState<boolean[]>([])
  const mode = useState<boolean>(true)
  const mode2 = useState<boolean>(false)
  const ctrl = useState<boolean>(false)

  const handleClear = () => {
    coords[1]([])
    circumselected[1]([])
  };
  const buttonDown = (event: { which: number; }) =>{
    if(event.which===17)
      ctrl[1](true)
  }
  const buttonUp = (event: { which: number; }) =>{
    if(event.which===17)
      ctrl[1](false)
  }

    return (
        <div tabIndex={0} onKeyDown={buttonDown} onKeyUp={buttonUp}>
            <h1>Delaunay/Voronoi Plotter</h1>
            <p>Click to plot points on the canvas below. The program will automatically construct the Delaunay Triangulation
              and corresponding Voronoi diagram.
            </p>
            <div>
              <Canvas props={coords} mode={mode} sizex={700} sizey={450} offsetx={0} offsety={0} circumselected={circumselected} ctrl={ctrl}></Canvas>
              <Canvas props={coords} mode={mode2} sizex={700} sizey={450} offsetx={-700} offsety={0} circumselected={circumselected} ctrl={ctrl}></Canvas>
            </div>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
            <div className="Info-Section" >
              <TabBox />
            </div>
        </div>
    )
}

export default Project;