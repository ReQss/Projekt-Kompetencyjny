import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/**
 * Entry point for rendering the React application.
 * Uses ReactDOM.createRoot() for concurrent mode rendering.
 *
 * @component
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
