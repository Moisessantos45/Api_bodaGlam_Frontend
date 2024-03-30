import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout/Layout";
import Login from "./Pages/Login";
import LayoutAdmin from "./Layout/LayoutAdmin";
import Home from "./Home/Home";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard/:id",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);
export default App;
