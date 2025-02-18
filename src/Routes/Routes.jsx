import DashboardLayout from "@/Layouts/DashboardLayout";
import MainLayout from "@/Layouts/MainLayout";
import AllDeliveryMens from "@/Pages/Dashboard/AdminPages/AllDeliveryMens/AllDeliveryMens";
import AllPercels from "@/Pages/Dashboard/AdminPages/AllPercels/AllPercels";
import AllUsers from "@/Pages/Dashboard/AdminPages/AllUsers/AllUsers";
import Statistics from "@/Pages/Dashboard/AdminPages/Statistics/Statistics";
import MyDeliveryList from "@/Pages/Dashboard/DeliveryManPages/MyDeliveryList/MyDeliveryList";
import MyReviews from "@/Pages/Dashboard/DeliveryManPages/MyReviews/MyReviews";
import BookAPercel from "@/Pages/Dashboard/GeneralUserPages/BookAPercel/BookAPercel";
import MyPercels from "@/Pages/Dashboard/GeneralUserPages/MyPercels/MyPercels";
import MyProfile from "@/Pages/Dashboard/GeneralUserPages/MyProfile/MyProfile";
import Payment from "@/Pages/Dashboard/GeneralUserPages/Payment/Payment";
import UpdateParcel from "@/Pages/Dashboard/GeneralUserPages/UpdateParcel/UpdateParcel";
import Home from "@/Pages/Home/Home";
import Login from "@/Pages/Login/Login";
import Register from "@/Pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";
import AdminRoute from "./AdminRoute";
import DeliveryRoute from "./DeliveryRoute";
import PrivateRoute from "./PrivateRoute";
import UserRoute from "./UserRoute.jsx";
import Error404 from "@/Pages/Error404/Error404";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Error404></Error404>
  },
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
        path: "all-delivery-mens",
        element: (
          <AdminRoute>
            <AllDeliveryMens></AllDeliveryMens>
          </AdminRoute>
        ),
      },
      {
        path: "all-percels",
        element: (
          <AdminRoute>
            <AllPercels></AllPercels>
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        ),
      },
      // Admin Routes here

      // General User Routes here
      {
        path: "book-percel",
        element: (
          <UserRoute>
            <BookAPercel></BookAPercel>
          </UserRoute>
        ),
      },
      {
        path: "my-percels",
        element: (
          <UserRoute>
            <MyPercels></MyPercels>
          </UserRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <UserRoute>
            <MyProfile></MyProfile>
          </UserRoute>
        ),
      },
      {
        path: "update-percels/:id",
        element: (
          <UserRoute>
            <UpdateParcel></UpdateParcel>
          </UserRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://assignment-12-server-side-delta.vercel.app/parcels/${params.id}`
          ),
      },
      {
        path: "payment",
        element: (
          <UserRoute>
            <Payment></Payment>
          </UserRoute>
        ),
      },
      // General User Routes here

      // Delivery Man Routes here
      {
        path: "my-delivery",
        element: (
          <DeliveryRoute>
            <MyDeliveryList></MyDeliveryList>
          </DeliveryRoute>
        ),
      },
      {
        path: "my-reviews",
        element: (
          <DeliveryRoute>
            <MyReviews></MyReviews>
          </DeliveryRoute>
        ),
      },
      // Delivery Man Routes here
    ],
  },
]);
