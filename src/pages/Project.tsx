import { useState } from "react";
import { Canvas } from "../components/delaunay";
import TabBox from "../components/TabBox"

const Project = () => {
    
  const coords = useState<number[]>([])
  const mode = useState<boolean>(true)
  const [otherView, setOtherView] = useState("Voronoi")

  const handleClear = () => {
    coords[1]([])
  };
  const handleMode = () => {
    if (otherView === "Voronoi") {
      setOtherView("Delaunay")
    } else {
      setOtherView("Voronoi")
    }
    mode[1](!mode[0])
  };

    return (
        <div>
            <h1>Delaunay/Voronoi Plotter</h1>
            <p>Click to plot points on the canvas below. The program will automatically construct the Delaunay Triangulation
              and corresponding Voronoi diagram.
            </p>
            <div>
              <Canvas props={coords} mode={mode}></Canvas>
            </div>
            <button type="button" onClick={handleClear}>
              Clear
            </button>
            <button type="button" onClick={handleMode}>
              Switch to {otherView} view
            </button>
            <div className="Info-Section" >
              <TabBox />
            </div>
        </div>
    )
}

export default Project;