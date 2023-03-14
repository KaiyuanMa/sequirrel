import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./state/store";
import UnderDevelopment from "./components/UnderDevelopment";

const root = createRoot(document.querySelector("#root"));

root.render(
  <Provider store={store}>
    <UnderDevelopment />
    <App />
  </Provider>
);
