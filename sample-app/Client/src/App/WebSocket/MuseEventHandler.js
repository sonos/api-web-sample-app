import { useContext, useEffect } from "react";
import {useRecoilCallback, useRecoilState} from "recoil";
import { SocketContext } from "./socket";
import PlaybackMetadataHandler from "../MuseDataHandlers/PlaybackMetadataHandler";
import PlaybackStateHandler from "../MuseDataHandlers/PlaybackStateHandler";
import VolumeHandler from "../MuseDataHandlers/VolumeHandler";
import playbackMetadataAtom from "../Recoil/playbackMetadataAtom";
import playbackStateAtom from "../Recoil/playbackStateAtom";
import volumeAtom from "../Recoil/volumeAtom";
import selectedGroupAtom from "../Recoil/selectedGroupAtom";
import SelectedGroupHandler from "../MuseDataHandlers/SelectedGroupHandler";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";
import groupsInfoAtom from "../Recoil/groupsInfoAtom";
import GroupsInfoHandler from "../MuseDataHandlers/GroupsInfoHandler";

/** 
 * Functional component that listens for Sonos API events sent via WebSocket connection from the server
 * Updates the state of Recoil atoms depending on the type of event received
 */
export default function MuseEventHandler() {
  // Uses WebSocket context defined in socket.js and connects to WebSocket initiated in Server/main.mjs
  const socket = useContext(SocketContext);

  const [playbackMetadataResponse, setPlaybackMetadataResponse] = useRecoilState(playbackMetadataAtom);
  const [playbackStateResponse, setPlaybackStateResponse] = useRecoilState(playbackStateAtom);
  const [volumeResponse, setVolumeResponse] = useRecoilState(volumeAtom);
  const [selectedGroupResponse, setSelectedGroupResponse] = useRecoilState(selectedGroupAtom);
  const [groupsInfoResponse, setGroupsInfoResponse] = useRecoilState(groupsInfoAtom);

  // useRecoilCallback was used to fetch the state of Recoil atoms without having MuseEventHandler subscribed to their states
  const selectedGroupSnapshot = useRecoilCallback(({snapshot}) => () => {
    let loadable = snapshot.getLoadable(selectedGroupAtom);
    return loadable.valueMaybe();
  }, []);
  const setPlayerVolumeResponse = useRecoilCallback(({set}) => (playerId, val) => {
    set(playerVolumeAtomFamily(playerId), val);
  }, []);
  const groupsInfoSnapshot = useRecoilCallback(({snapshot}) => () => {
    let loadable = snapshot.getLoadable(groupsInfoAtom);
    return loadable.valueMaybe();
  }, []);

  // Sets up a callback function to handle incoming messages
  useEffect(() => {
    if (socket !== undefined) {
      // Receive the events from server via WebSocket connection
      socket.on("message from server", (requestData) => {
        // An event has been received from the server and will be processed based on the type of event
        if (requestData.headers !== undefined) {
          // Filters events to ensure only group events targeting the current group are acted on
          if (requestData.headers["x-sonos-target-value"] === selectedGroupSnapshot().groupId) {
            if (getMethodType(requestData) === "playbackStatus") {
              const res = PlaybackStateHandler(requestData.data);
              setPlaybackStateResponse(res);
            } else if (getMethodType(requestData) === "groupVolume") {
              const res = VolumeHandler(requestData.data);
              setVolumeResponse(res);
            } else if (getMethodType(requestData) === "metadataStatus") {
              const res = PlaybackMetadataHandler(requestData.data);
              setPlaybackMetadataResponse(res);
            } else if (getMethodType(requestData) === "groupCoordinatorChanged") {
              const res = SelectedGroupHandler(requestData.data);
              res.groupId = selectedGroupSnapshot().groupId;
              setSelectedGroupResponse(res);
            }
          } else if (getMethodType(requestData) === "playerVolume") {
            // Uses message's target to determine which player's volume to update
            const res = VolumeHandler(requestData.data);
            setPlayerVolumeResponse(requestData.headers["x-sonos-target-value"], res);
          } else if (getMethodType(requestData) === "groups" && requestData.headers["x-sonos-target-value"] === groupsInfoSnapshot().householdId) {
            // Filters events to ensure that only events targeting the current household are acted on
            const res = GroupsInfoHandler(requestData.data);
            res.householdId = groupsInfoSnapshot().householdId;
            setGroupsInfoResponse(res);
          }
        }
      });
    }
  }, []);
}

/**
 * Retrieves message type from Sonos API message
 * @param request {JSON} Message received by client via WebSocket connection
 * @return {string} Sonos API message type
 */
function getMethodType(request) {
  try {
    return request.headers["x-sonos-type"];
  } catch (e) {
    console.error("Error in fetching method type...", e);
  }
}
