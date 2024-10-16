import Project from "../pages/Project";
import About from "../pages/About";
import Sources from "../pages/Sources"

interface PageProps{
    path: string
}

const Router = (props: PageProps) => {
    if (props.path === "sources") {
        return <Sources />
    } else if (props.path === "about") {
        return <About />
    } else {
        return <Project />
    }
}
    

export default Router;