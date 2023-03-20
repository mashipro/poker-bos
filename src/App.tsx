import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import rootRoutes from "./apps/routes/Root";
import { Provider } from "react-redux";
import store from "./apps/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <RouterProvider router={rootRoutes} />
      </PersistGate>
    </Provider>
  );
};
export default App;
