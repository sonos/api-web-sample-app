import React from "react";

import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import {useRecoilState} from "recoil";
import groupStatusAtom from "../Recoil/groupStatusAtom";

export default function GroupRoutingController(props) {
  let navigate = useNavigate();
  const [groupStatusState, setGroupStatusState] = useRecoilState(groupStatusAtom);

  const routeChange = () => {
    let path = "../groups/" + props.group.id;
    const playersInGroup = {};
    props.group.playerIds.forEach(playerId => playersInGroup[playerId] = playerId);
    setGroupStatusState({
      groupID: props.group.id,
      groupName: props.group.name,
      groupGoneFlag: false
    });

    const data = {
      state: {
        householdID: props.householdID,
        groupID: props.group.id
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
