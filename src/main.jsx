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
import SingleOrder from "./routes/orders/[id]/page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
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
      {
        path: "/orders/:id",
        element: <SingleOrder />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
