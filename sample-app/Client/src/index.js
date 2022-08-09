import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

import "./css/login.css";
import "./css/dashboard.css";
import "./css/navbar.css"
import "./css/controlPage.css";
import "./css/players.css";
import "./css/errorPage.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HelperGroupControl from "./App/ControlAPIs/helperGroupControl";
import ErrorPage from "./App/ErrorHandling/errorPage";
import RouteComponents from "./App/Controllers/routingController";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Router>
      <Routes>
        <Route path={"/*"} element={<RouteComponents />} />
        <Route path="/groups/:id" element={<HelperGroupControl />} />
        <Route path="/error-page" element={<ErrorPage />} />
      </Routes>
    </Router>
  </div>
);
