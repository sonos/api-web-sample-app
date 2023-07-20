import React from "react";

import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import {useRecoilState} from "recoil";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";

export default function GroupRoutingController(props) {
  let navigate = useNavigate();
  const [selectedGroupState, setSelectedGroupState] = useRecoilState(selectedGroupAtom);

  const routeChange = () => {
    let path = "../groups/" + props.group.id;
    setSelectedGroupState({
      groupId: props.group.id,
      groupName: props.group.name,
      groupGoneFlag: false
    });

    const data = {
      state: {
        householdId: props.householdId,
        groupId: props.group.id
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
