import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import React from "react";
import { GroupsApiFactory } from "../museClient/api";
import HeaderComponent from "../Components/headerComponent";
import {useRecoilState} from "recoil";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";
import GroupsInfoHandler from "../MuseDataHandlers/GroupsInfoHandler";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";

export default function GetGroups(props) {
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  const [selectedGroupState, setSelectedGroupState] = useRecoilState(selectedGroupAtom);
  const [error, setError] = useState(false);

  useEffect(() => {
    const householdId = props.householdId;
    
    const groupsApi = new GroupsApiFactory(props.museClientConfig);
    groupsApi.groupsGetGroups(householdId)
    .then((groupsAPIresponse) => {
      const res = GroupsInfoHandler(groupsAPIresponse);
      res.groupFlag = false;
      res.householdId = props.householdId
      setGroupsInfoState(res);
      if (props.setGroup) {
        setSelectedGroupState({
          groupGoneFlag: false,
          groupId: props.groupId,
          groupName: res.groups[props.groupId].name
        });
      }
      setError(false);
    })
    .catch(function (error) {
      console.error("Error", error);
      setError(true)
    });
  }, []);

  return error === true ? (
    <div className="main_page">
      <HeaderComponent/>
      <br />
      <h1 className="oauthtext">Groups in this household could not be found.</h1>
    </div>
  ) : (
    <div className="main_page">
      <div className="render_page">
      <CircularProgress color="inherit" />
      </div>
    </div>
  );

}
