import React from "react";

export default function BackButton(props) {
  const goBack = () => {
    props.navigate(-1);
  }

  return (
      <div className="back_button" onClick={goBack} >
          <i className="fa fa-chevron-circle-left fa-3x" ></i>
      </div>
  );
}
