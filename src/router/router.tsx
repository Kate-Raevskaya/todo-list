import {createBrowserRouter} from "react-router";
import App from "../app/App.tsx";
import {lazy} from "react";

const Projects = lazy(() => import("../features/projects/ui/Projects/Projects.tsx"))
const TodoPage = lazy(() => import("../features/todo/ui/TodoPage/TodoPage.tsx"))


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Projects/>
            },
            {
                path: 'todo/:projectId',
                element: <TodoPage/>
            }
        ]
    }
])