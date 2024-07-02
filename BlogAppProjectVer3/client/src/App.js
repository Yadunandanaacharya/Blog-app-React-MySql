import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style.scss";

import axios from 'axios'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/post/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      }
    ]
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/singe",
    element: <Single/>,
  },
  {
    path: "/write",
    element: <Write/>,
  },

]);

function App() {

  const handleClick = (product)=>{
    axios.post("http://localhost:5000/payment",{
      name:"hi",
      desx:"asf"
    })
  }

  return (
    <div className="app">
      <div className="container">
        <button  onClick={handleClick}>clik me</button>
      <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  );
}

export default App;
