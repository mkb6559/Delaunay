import { useState } from "react";
import { Canvas } from "../components/delaunay";
import TabBox from "../components/TabBox"

const Project = () => {
    
  const [coords,setCoords] = useState<number[]>([])
  const circumselected = useState<boolean[]>([])
  const mode = useState<boolean>(true)
  const mode2 = useState<boolean>(false)
  const ctrl = useState<boolean>(false)

  const handleClear = () => {
    setCoords([])
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
              <Canvas props={[coords,setCoords]} mode={mode} right={false} circumselected={circumselected} ctrl={ctrl}></Canvas>
              <Canvas props={[coords,setCoords]} mode={mode2} right={true} circumselected={circumselected} ctrl={ctrl}></Canvas>
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
