import MainLayout from "@/Layouts/MainLayout";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import Register from "@/Pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "@/Layouts/DashboardLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
        // Admin Routes here
        {
            
        }
        // Admin Routes here

        // General User Routes here

        // General User Routes here

        // Delivery Man Routes here

        // Delivery Man Routes here
    ]
  },
]);
