import React from "react";
import ImageComponent from "./GroupSubComponents/imageComponent";
// import { useNavigate } from 'react-router-dom';


export default function HeaderComponent() {
  const logout = () => {
    console.debug("Logging out...");
    window.localStorage.clear();
    window.location.reload(true);
  };

  return (
    <div className="logo_logout">
      <div className="logo">
        <ImageComponent src={require("../../images/logo.png")} />
      </div>
      <div className="logout">
        <a onClick={logout}>
          <ImageComponent src={require("../../images/logout.png")} /> 
        </a>
      </div>
    </div>
  );
}
