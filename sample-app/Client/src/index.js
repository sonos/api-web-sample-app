import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "./css/playerControls.css";
import "./css/groups.css";
import "./css/error_page.css";

import Navbar from "./App/Controllers/navBarController";
import RouteComponents from "./App/Controllers/routingController";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HelperGroupControl from "./App/Controls/helperGroupControl";
import ErrorPage from "./App/ErrorHandling/errorPage";
import SetUpClient from "./App/WebSokcet/setUpWebsocketClient";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Setting up the Web Socket Client
SetUpClient();

root.render(
  <React.StrictMode>
    <Navbar />

    <Router>
      <Routes>
        <Route path={"/*"} element={<RouteComponents />} />
        <Route path="/groups/:id" element={<HelperGroupControl />} />
        <Route path="/error-page" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
