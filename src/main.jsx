import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styling/index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store.js";
import UtilsApi from "./context/utilsContext";
import { Provider } from "react-redux";
import UserStateContext from "./context/userState";
import FooterContentProvider from "./context/footerContentProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserStateContext>
      <UtilsApi>
        <Provider store={store}>
          <FooterContentProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </FooterContentProvider>
        </Provider>
      </UtilsApi>
    </UserStateContext>
  </BrowserRouter>
);
