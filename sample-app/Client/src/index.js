import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";

import "./css/login.css";
import "./css/dashboard.css";
import "./css/navbar.css"
import "./css/controlPage.css";
import "./css/players.css";
import "./css/errorPage.css";

import RouteComponents from "./App/Controllers/routingController";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HelperGroupControl from "./App/Controls/helperGroupControl";
import ErrorPage from "./App/ErrorHandling/ErrorPage";

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
