import { createBrowserRouter } from "react-router-dom";
import Projects from "../pages/Projects";

export const Routes = createBrowserRouter([
        {
        path: "/",
        element: <Projects/>
        },
        {
        path: "/projects",
        element: <Projects/>
        }
    ]);