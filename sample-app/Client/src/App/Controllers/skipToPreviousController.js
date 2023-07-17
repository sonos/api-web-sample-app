import {PlaybackApi} from "../museClient/api";
import HelperControls from "../ControlAPIs/playerControls";

export default function SkipToPreviousController(props) {
    console.debug("Trying to skip to previous song...");
    const controlOptions = new HelperControls();
    const playBackApi = new PlaybackApi(props.museClientConfig);

    playBackApi
        .playbackGetPlaybackStatus(props.groupID)
        .then((res) => {
            if(res.positionMillis <= 4000 && res.availablePlaybackActions.canSkipBack) {
                controlOptions.helperControls("skipToPreviousTrack", props.groupID, {});
            }
            else {
                controlOptions.helperControls("seek", props.groupID, {positionMillis: 0});
            }
            props.setSkipBack(false);
        })
        .catch(function (error) {
            console.error("Error in fetching the state at start: ", error);
        });
}
