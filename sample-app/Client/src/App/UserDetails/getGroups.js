import { useEffect, useState } from "react";
import { CircularProgress } from '@mui/material';
import React from "react";
import { GroupsApiFactory } from "../museClient/api";
import HeaderComponent from "../Components/headerComponent";
import {useRecoilState} from "recoil";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";
import GroupsInfoHandler from "../MuseDataHandlers/GroupsInfoHandler";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";

/**
 * Fetches current household's groups information from Sonos API
 * @param props.museClientConfig {JSON} Contains Sonos API access token
 * @param props.householdId {string} ID of current household
 * @param props.setGroup {boolean} If true, this function updates the state of selectedGroupAtom
 *    This is false when GetGroups is called by FetchGroupsController, since a group has not yet been selected
 *    This is true when GetGroups is called by GroupPlaybackComponent, since a group has been selected
 * @param props.groupId {string} Only to be passed through props if props.setGroup is true.
 *    Used to identify which group's data to use when updating selectedGroupAtom
 * @param props.displayLoadingScreen {boolean} True when called from FetchGroups, false when called from GroupPlaybackComponent
 * @return {JSX.Element} Displays error screen only if error has been encountered
 */
export default function GetGroups(props) {
  // groupsInfoState (unused) accesses and setGroupsInfoState modifies groupsInfoAtom's state
  const [groupsInfoState, setGroupsInfoState] = useRecoilState(groupsInfoAtom);

  // selectedGroupState (unused) accesses and setSelectedGroupState modifies selectedGroupAtom's state
  const [selectedGroupState, setSelectedGroupState] = useRecoilState(selectedGroupAtom);

  // error is set to true if error has been encountered. False by default
  const [error, setError] = useState(false);

  useEffect(() => {
    // Used to make groups Sonos API calls with currently stored access token and configuration
    const groupsApi = new GroupsApiFactory(props.museClientConfig);

    // Fetches current groups from Sonos API
    groupsApi.groupsGetGroups(props.householdId)
    .then((groupsAPIresponse) => {
      // Processes API response and updates state of groupsInfoAtom
      const res = GroupsInfoHandler(groupsAPIresponse);
      res.householdId = props.householdId
      setGroupsInfoState(res);

      // If indicated by props.setGroup, selectedGroupAtom is updated to reflect the state of the group with the ID of props.groupId
      if (props.setGroup) {
        setSelectedGroupState({
          groupGoneFlag: false,
          groupId: props.groupId,
          groupName: res.groups[props.groupId].name
        });
      }

      // No error encountered
      setError(false);
    })
    .catch(function (error) {
      // Error in fetching data from Sonos API. Causes error screen to be displayed
      console.error("Error", error);
      setError(true)
    });
  }, []);

  // If an error has occurred, show error screen. Otherwise, if on groups page, show loading screen while data is being fetched
  return error === true ? (
    <div className="main_page">
      <HeaderComponent/>
      <br />
      <h1 className="oauthtext">Groups in this household could not be found.</h1>
    </div>
  ) : props.showLoadingScreen && (
    <div className="main_page">
      <div className="render_page">
      <CircularProgress color="inherit" />
      </div>
    </div>
  );
}
