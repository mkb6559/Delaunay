import {
    createBrowserRouter,
} from "react-router-dom";
import Project from "../pages/Project";
import About from "../pages/About";
import Sources from "../pages/Sources"

const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Project/>,
    },
    {
        path: '/about',
        element: <About/>,
    },
    {
        path: '/sources',
        element: <Sources/>,
    },
]);

export default Routes;