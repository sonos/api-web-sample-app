import { PlaybackMetadataApiFactory } from "../museClient/api";
import PlaybackMetadataHandler from "../MuseDataHandlers/PlaybackMetadataHandler";
import {useRecoilState} from "recoil";
import playbackMetadataAtom from "../Recoil/playbackMetadataAtom";

export default function PlayBackMetadata(props) {
  const [playbackMetadataResponse, setPlaybackMetadataResponse] = useRecoilState(playbackMetadataAtom);
  const playBackMetadataApi = new PlaybackMetadataApiFactory(
    props.museClientConfig
  );

  playBackMetadataApi
    .playbackMetadataGetMetadataStatus(props.group_id)
    .then((res) => {
      setPlaybackMetadataResponse(PlaybackMetadataHandler(res));
    })
    .catch(function (error) {
      console.error("Error", error);
    });
}
