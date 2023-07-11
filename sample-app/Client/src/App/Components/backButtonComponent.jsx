import React from "react";
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
    const navigate = useNavigate();
    const goBack = () => {
    navigate(-1);
  }

  return (
      <div className="back_button" onClick={goBack} >
          <i className="fa fa-chevron-circle-left fa-3x" aria-hidden="true"></i>
      </div>
  );
}