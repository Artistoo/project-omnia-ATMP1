import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styling/index.css";
import { BrowserRouter } from "react-router-dom";

//__________CONTEXT_______________
import UserStateContext from "./context/userState";
import FooterContentProvider from "./context/footerContentProvider";
import PopUps from "./context/PopUps.jsx";
//___________REDUX_______________
import store from "./redux/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UserStateContext>
      <Provider store={store}>
        <FooterContentProvider>
          <PopUps>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </PopUps>
        </FooterContentProvider>
      </Provider>
    </UserStateContext>
  </BrowserRouter>
);
