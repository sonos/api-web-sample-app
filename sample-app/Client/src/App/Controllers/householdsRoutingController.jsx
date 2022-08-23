import React from "react";

import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

export default function HouseholdRoutingController(props) {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = "households/" + props.household.id;
    const data = { state: { household_id: props.household.id } };
    navigate(path, data);
  };

  return (
    <div className="group_det">
      <Container>
        <a onClick={routeChange}>
          <p className="group_ind">Household {props.index + 1}</p>
        </a>
      </Container>
    </div>
  );
}
