import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./css/playerControls.css";
import "./css/groups.css";

import Navbar from "./App/Controllers/navBarController";
import RouteComponents from "./App/Controllers/routingController";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HelperGroupControl from "./App/Controls/helperGroupControl";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Navbar />

    <Router>
      <Routes>
        <Route path={"/*"} element={<RouteComponents />} />
        <Route path="/groups/:id" element={<HelperGroupControl />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
