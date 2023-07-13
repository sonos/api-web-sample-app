import { useContext, useEffect } from "react";
import {useRecoilCallback, useRecoilState} from "recoil";
import { SocketContext } from "./socket";
import PlaybackMetadataHandler from "../MuseDataHandlers/PlaybackMetadataHandler";
import PlaybackStateHandler from "../MuseDataHandlers/PlaybackStateHandler";
import VolumeHandler from "../MuseDataHandlers/VolumeHandler";
import playbackMetadataAtom from "../Recoil/playbackMetadataAtom";
import playbackStateAtom from "../Recoil/playbackStateAtom";
import volumeAtom from "../Recoil/volumeAtom";
import groupStatusAtom from "../Recoil/groupStatusAtom";
import GroupStatusHandler from "../MuseDataHandlers/GroupStatusHandler";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";

export default function MuseEventHandler() {
  const socket = useContext(SocketContext);
  const [playbackMetadataResponse, setPlaybackMetadataResponse] = useRecoilState(playbackMetadataAtom);
  const [playbackStateResponse, setPlaybackStateResponse] = useRecoilState(playbackStateAtom);
  const [volumeResponse, setVolumeResponse] = useRecoilState(volumeAtom);
  const [groupStatusResponse, setGroupStatusResponse] = useRecoilState(groupStatusAtom);
  const setPlayerVolumeResponse = useRecoilCallback(({set}) => (playerId, val) => {
    set(playerVolumeAtomFamily(playerId), val);
  }, []);

  useEffect(() => {
    if (socket !== undefined) {
      // Receive the events via websocket connection established
      socket.on("message from server", (requestData) => {
        if (requestData.headers !== undefined) {
          if (getMethodType(requestData) === "playbackStatus") {
            const res = PlaybackStateHandler(requestData.data);
            setPlaybackStateResponse(res);
          }
          else if (getMethodType(requestData) === "groupVolume") {
            const res = VolumeHandler(requestData.data);
            setVolumeResponse(res);
          }
          else if (getMethodType(requestData) === "metadataStatus") {
            const res = PlaybackMetadataHandler(requestData.data);
            setPlaybackMetadataResponse(res);
          }
          else if (getMethodType(requestData) === "groupCoordinatorChanged") {
            const res = GroupStatusHandler(requestData.data);
            setGroupStatusResponse(res);
          }
          else if (getMethodType(requestData) === "playerVolume") {
            const res = VolumeHandler(requestData.data);
            res.inGroup = true;
            setPlayerVolumeResponse(requestData.headers["x-sonos-target-value"], res);
          }
          else{
            console.error(requestData);
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
