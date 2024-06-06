import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./error-page";
import Root from "./routes/root";
import Orders from "./routes/orders/page.jsx";
import AddOrder from "./routes/orders/add.jsx";
import Page from "./routes/trackers/page.jsx";
import { Login } from "./routes/login/page.jsx";
import { SignUp } from "./routes/signup/page.jsx";
import { PrivateRoutes } from "./PrivateRoutes.jsx";
import { PublicRoute } from "./PublicRoute.jsx";
import Track from "./routes/track/page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Page />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/orders/new",
        element: <AddOrder />,
      },
    ],
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/signup",
    element: <PublicRoute />,
    children: [
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/track/",
    element: <PublicRoute />,
    children: [
      {
        path: "/track/:id",
        element: <Track />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
