import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index";
import { SkeletonTheme } from "react-loading-skeleton";
import { Web3ModalProvider } from "./web3Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <SkeletonTheme baseColor="#000" highlightColor="#444">
      <Web3ModalProvider>
        <App />
      </Web3ModalProvider>
    </SkeletonTheme>
  </Provider>
);
