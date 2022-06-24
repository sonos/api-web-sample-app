import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './css/player_controls.css';

import Navbar from './App/Controllers/navBarController';
import RouteComponents from './App/Controllers/routingController';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Navbar/>
      <RouteComponents />
  </React.StrictMode>
);
