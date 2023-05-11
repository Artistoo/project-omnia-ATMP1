import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styling/index.css";
import { BrowserRouter } from "react-router-dom";
import UserStateContext from "./context/userState";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserStateContext>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserStateContext>
  </BrowserRouter>
);
