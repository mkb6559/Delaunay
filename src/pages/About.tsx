
const About = () => {
  return (

      <div className="App">
      <h1>Delaunay Triangulation and Voronoi Diagrams</h1>
      <p>The Delaunay triangulation of a set of points subdivides the polygon formed by their convex hull into a set of triangles whose circumcircles do not contain any other point in the set. As it happens, connecting the centers of those circumcircles with lines produces the Voronoi diagram for that set. Why is that? In this project, we will present a pedagogical aid that shows a dynamic Delaunay triangulation for a set of points and a toggle that will overlay or show the corresponding Voronoi diagram. We will explore the mathematics behind the connection between the two artifacts as well as some of their real-world applications. Our aid will allow viewers to visualize the connection between Delaunay triangulation and Voronoi diagrams and understand their importance.
      </p>
      <div>
      </div>
      <footer>
        Project by Will Hoover and Max Bustillo
      </footer>
    </div>
  )
}

export default About;