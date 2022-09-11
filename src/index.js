import React from "react";
import ReactDOM from "react-dom/client";
// #3-5-2
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // #5-5-5
  //<React.StrictMode>
  <App />
  //</React.StrictMode>
);
