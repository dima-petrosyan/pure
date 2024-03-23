import { createBrowserRouter } from "react-router-dom";
import Workspace from "pages/workspace/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Workspace />,
  },
]);
