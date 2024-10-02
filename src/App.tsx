import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/components/Home";
import RepoDetails from "./app/components/RepoDetails";
import Notfound from "./app/components/Notfound";
import ProtectedRoute from "./app/components/ProtectedRoute";
import { lazy, Suspense } from "react";

const RepoList = lazy(() => import("./app/components/RepoList"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  /*{
    path: "/repositories",
    element: <RepoList />,
  },*/
  {
    path: "/repositories",
    element: <ProtectedRoute redirectPath="/" />,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>"loading..."</div>}>
            <RepoList></RepoList>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/:owner/:repositoryName?",
    element: <RepoDetails />,
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
