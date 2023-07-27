import React from "react";
import ImageComponent from "./GroupSubComponents/imageComponent";

/** 
 *  This contains elements for the header. 
 *  The elements are the Sonos logo image and the logout button image
 *  These elements appear on the households, groups, and group player pages.
 */
export default function HeaderComponent() {
  //this function is called upon when the logout image is clicked.
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
