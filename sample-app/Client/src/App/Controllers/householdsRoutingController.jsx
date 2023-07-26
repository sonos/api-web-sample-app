import React from "react";

import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";

/**
 * Returns a button that when clicked, routes user to the appropriate household's groups page
 * @param props.household {JSON} Contains household information
 * @param props.index {number} Used for naming the household, as most households do not have names
 * @returns {JSX.Element} Household button
 */
export default function HouseholdRoutingController(props) {
  // Used to change currently displayed path and send data to new path
  let navigate = useNavigate();

  /**
   * onClick listener of button that navigates to household's path and sends household ID information to new location
   */
  const routeChange = () => {
    let path = "households/" + props.household.id;
    const data = { state: { householdId: props.household.id } };
    navigate(path, data);
  };

  // Returns household button with routeChange as onClick listener
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
