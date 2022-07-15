import React from "react";

import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";

function GroupComponent(props) {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "groups/" + props.group.id;
    const data = { state: { group: JSON.stringify(props.group) } };
    navigate(path, data);
  };

  return (
    <div className="app flex-row align-items-center">
      <Container>
        <h4>Group ID. {props.group.id}</h4>
        <h4>Group Name : {props.group.name}</h4>
        <Button color="primary" className="px-4" onClick={routeChange}>
          Redirect
        </Button>
      </Container>
    </div>
  );
}

export default GroupComponent;
