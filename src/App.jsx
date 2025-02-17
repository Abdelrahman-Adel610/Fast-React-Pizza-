import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderLoader } from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
import Error from "./ui/Error";
const route = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/pizza"} />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/pizza",
        element: <Home />,
      },
      {
        path: "/pizza/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/pizza/cart",
        element: <Cart />,
      },
      {
        path: "/pizza/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
      {
        path: "/pizza/order/new",
        element: <CreateOrder />,
      },
    ],
  },
]);
export default function App() {
  return <RouterProvider router={route} />;
}
