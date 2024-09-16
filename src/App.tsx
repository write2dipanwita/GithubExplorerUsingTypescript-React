import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./app/components/Home";
import RepoList from "./app/components/RepoList";
import RepoDetails from "./app/components/RepoDetails";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/repositories",
    element: <RepoList />,
  },
  {
    path: "/:owner/:repositoryName",
    element: <RepoDetails />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
