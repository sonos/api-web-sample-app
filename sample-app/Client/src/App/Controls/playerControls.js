import Authentication from "../Authentication/Authentication";
import Helper from "../Utility/Helper";
import { Component } from "react";
import { PlaybackApi } from "../museClient/api";

class HelperControls extends Component {

  constructor() {
    super();
    this.authentication = new Authentication();
    this.helper = new Helper();
  }

  helperControls(input_action, grp_id, museClientConfig) {
    /*
    const playBackApi = new PlaybackApi(configuration);
    if(input_action === "skipToNextTrack"){
      console.log("skipToNextTrack");
      playBackApi.playbackSkipToPreviousTrack(grp_id)
      .then((res) => {
        return true;
      })
      .catch(function (error) {
        console.error("Error", error);
        return false;
      });

    }else if ( input_action === "togglePlayPause"){
      console.log("togglePlayPause");
      playBackApi.playbackTogglePlayPause(grp_id)
      .then((res) => {
        return true;
      })
      .catch(function (error) {
        console.error("Error", error);
        return false;
      });
    }else if (input_action === "pause" ){
      console.log("Pause");
      playBackApi.playbackPause(grp_id)
      .then((res) => {
        return true;
      })
      .catch(function (error) {
        console.error("Error", error);
        return false;
      });
    }
    else if (input_action === "play" ){
      console.log("Play");
      playBackApi.playbackPlay(grp_id)
      .then((res) => {
        return true;
      })
      .catch(function (error) {
        console.error("Error", error);
        return false;
      });
    }*/

    
    let endPoint = this.helper.getGroupsURL() + 
    grp_id + "/playback/" + input_action;
    
    const headers = this.helper.getHeaderBearer()

    const data = {};

    this.helper.apiCall(endPoint, headers, "POST", data)
    .then((res) => {
      return true;
    })
    .catch(function (error) {
      console.error(error);
      return false;
    });
  };
};

export default HelperControls;


