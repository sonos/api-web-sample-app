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
    <div className="group_det">
      <Container>
        <div className="group_ind">
          <a onClick={routeChange} >{props.group.name}</a>
        </div>
      </Container>
    </div>
  );
}

export default GroupComponent;
