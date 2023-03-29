import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Err from "./Err";
import Summary from "./components/Summary";
import Book from "./components/Book";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Err />,
  },
  {
    path: "/:movieId",
    element: <Summary />,
  },
  {
    path: "/:movieId/book",
    element: <Book />,
  },
  {
    path: "/404",
    element: <Err />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
