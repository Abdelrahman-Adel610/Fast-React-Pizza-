import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Menu from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order from "./features/order/Order";
import CreateOrder from "./features/order/CreateOrder";
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
      },
      {
        path: "/pizza/cart",
        element: <Cart />,
      },
      {
        path: "/pizza/order/:orderId",
        element: <Order />,
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
