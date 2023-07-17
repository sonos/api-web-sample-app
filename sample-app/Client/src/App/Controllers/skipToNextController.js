import {PlaybackApi} from "../museClient/api";
import HelperControls from "../ControlAPIs/playerControls";

export default function SkipToNextController(props) {
    console.debug("Trying to skip to next song...");
    const controlOptions = new HelperControls();
    const playBackApi = new PlaybackApi(props.museClientConfig);

    playBackApi
        .playbackGetPlaybackStatus(props.groupID)
        .then((res) => {
            if(res.availablePlaybackActions.canSkip) {
                controlOptions.helperControls("skipToNextTrack", props.groupID, {});
            }
            props.setSkipForward(false);
        })
        .catch(function (error) {
            console.error("Error in fetching the state at start: ", error);
        });
}
