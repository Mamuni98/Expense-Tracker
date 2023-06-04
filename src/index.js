import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { AuthContextProvider } from "./Components/contexts/auth-context";
import { ExpenseProvider } from "./Components/contexts/e-context";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <ExpenseProvider>
        <App />
      </ExpenseProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
