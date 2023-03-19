import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import rootRoutes from "./apps/routes/Root";

const App = () => {
  return <RouterProvider router={rootRoutes} />;
};
export default App;
