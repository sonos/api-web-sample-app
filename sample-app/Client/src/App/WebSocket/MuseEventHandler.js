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

export default function MuseEventHandler() {
  const socket = useContext(SocketContext);
  const [playbackMetadataResponse, setPlaybackMetadataResponse] = useRecoilState(playbackMetadataAtom);
  const [playbackStateResponse, setPlaybackStateResponse] = useRecoilState(playbackStateAtom);
  const [volumeResponse, setVolumeResponse] = useRecoilState(volumeAtom);
  const [selectedGroupResponse, setSelectedGroupResponse] = useRecoilState(selectedGroupAtom);
  const selectedGroupSnapshot = useRecoilCallback(({snapshot}) => () => {
    let loadable = snapshot.getLoadable(selectedGroupAtom);
    return loadable.valueMaybe();
  }, []);
  const setPlayerVolumeResponse = useRecoilCallback(({set}) => (playerId, val) => {
    set(playerVolumeAtomFamily(playerId), val);
  }, []);
  const [groupsInfoResponse, setGroupsInfoResponse] = useRecoilState(groupsInfoAtom);
  const groupsInfoSnapshot = useRecoilCallback(({snapshot}) => () => {
    let loadable = snapshot.getLoadable(groupsInfoAtom);
    return loadable.valueMaybe();
  }, []);

  useEffect(() => {
    if (socket !== undefined) {
      // Receive the events via websocket connection established
      socket.on("message from server", (requestData) => {
        if (requestData.headers !== undefined) {
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
            const res = VolumeHandler(requestData.data);
            setPlayerVolumeResponse(requestData.headers["x-sonos-target-value"], res);
          } else if (getMethodType(requestData) === "groups" && requestData.headers["x-sonos-target-value"] === groupsInfoSnapshot().householdId) {
            const res = GroupsInfoHandler(requestData.data);
            res.householdId = groupsInfoSnapshot().householdId;
            setGroupsInfoResponse(res);
          }
        }
      });
    }
  }, []);
}

function getMethodType(request) {
  try {
    return request.headers["x-sonos-type"];
  } catch (e) {
    console.error("Error in fetching method type...", e);
  }
}
