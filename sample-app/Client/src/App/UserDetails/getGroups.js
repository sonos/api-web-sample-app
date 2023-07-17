import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import React from "react";
import { GroupsApiFactory } from "../museClient/api";
import HeaderComponent from "../Components/headerComponent";
import {useRecoilState} from "recoil";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";
import GroupsInfoHandler from "../MuseDataHandlers/GroupsInfoHandler";
import groupStatusAtom from "../Recoil/groupStatusAtom";

export default function GetGroups(props) {
  const [errorValue, setError] = useState([]);
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);
  const [groupStatusState, setGroupStatusState] = useRecoilState(groupStatusAtom);

  useEffect(() => {
    
    let mounted = true;
    const HOUSEHOLD_ID = props.householdID;
    
    const groupsApi = new GroupsApiFactory(props.museClientConfig);
    groupsApi.groupsGetGroups(HOUSEHOLD_ID)
    .then((groupsAPIresponse) => {
      if (mounted) {
        setError(false);
        const res = GroupsInfoHandler(groupsAPIresponse);
        res.group_flag = false;
        res.householdID = props.householdID
        setGroupsInfoState(res);
        if (props.setGroup) {
          setGroupStatusState({
            groupGoneFlag: false,
            groupID: props.groupID,
            groupName: res.groups[props.groupID].name
          });
        }
      }
    })
    .catch(function (error) {
      console.log(error);
      console.error("Group IDs could not be found");
      setError(true);
      return Promise.reject(error);
    });
    return () => (mounted = false);
  }, []);

  return errorValue === false ? (
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
