import React from "react";

import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

export default function GroupRoutingController(props) {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "../groups/" + props.group.id;
    const data = {
      state: {
        group: JSON.stringify(props.group),
        players: JSON.stringify(props.players),
      },
    };
    navigate(path, data);
  };

  return (
    <div className="group_det">
      <Container>
        <a onClick={routeChange}>
          <p className="group_ind">{props.group.name}</p>
        </a>
      </Container>
    </div>
  );
}
