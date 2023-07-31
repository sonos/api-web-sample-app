import React from "react";
import ImageComponent from "./GroupSubComponents/imageComponent";

/** 
 *  Functional component for header used throughout application
 *  Displays Sonos logo image and logout button image
 *  These elements appear on the households, groups, and group player pages.
 */
export default function HeaderComponent() {
  /**
   * onClick handler for log out button. Clears stored access token and navigates user back to login page
   */
  const logout = () => {
    window.localStorage.clear();
    window.location.reload();
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
