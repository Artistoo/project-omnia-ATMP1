import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styling/index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import UserStateContext from "./context/userState";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <UserStateContext>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserStateContext>
    </Provider>
  </BrowserRouter>
);
