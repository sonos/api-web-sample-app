import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";

export default function ErrorPage() {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div>
      <div className="mainbox">
        <div className="err">4</div>
        <i className="far fa-question-circle fa-spin"></i>
        <div className="err2">4</div>
        <div className="msg">
          Maybe this page Moved? Deleted? Quarantined? Never existed?
        </div>
      </div>
      <div>
        <Container align="center">
          <br />
          <Button color="primary" className="px-4" onClick={routeChange}>
            Go Home
          </Button>
        </Container>
      </div>
    </div>
  );
}
