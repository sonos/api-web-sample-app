import React from "react";
import { Component } from "react";
import GetVolume from "../../Controls/getVolume";
import SetVolume from "../../Controls/setVolume";
import HelperControls from "../../Controls/playerControls";
import SetUpClient from "../../WebSokcet/setUpWebsocketClient";

class VolumeComponent extends Component {
  constructor() {
    super();
    this.ControlOptions = new HelperControls();
    this.volumeSlider = React.createRef();
    this.state = {
      volumeVal: 40,
      getStartVolumeFlag: true,
    };
  }

  onSetVolume = () => {
    const volume = this.volumeSlider.current.value;
    SetVolume(volume, this.props.groupID, "GROUP", this.props.configuration);
    this.setState({ volumeVal: volume });
  };

  getVolumeHandler = (flag, volumeAtStart) => {
    this.setState({ getStartVolumeFlag: flag, volumeVal: volumeAtStart });
  };

  receiveEventsHandler = (response) => {
    response = JSON.parse(response);
    console.debug(response);
    if (response.method === "volumeControl"){
      this.setState({volumeVal : response["data"]["volume"]});
    }
  }

  render() {
    return (
      <div className="slider_container">

        {/* Setting up the Web Socket Client */}
        {/* <SetUpClient receiveEventsHandler={this.receiveEventsHandler} /> */}

        {this.state.getStartVolumeFlag && (
          <GetVolume
            deviceId={this.props.groupID}
            deviceType={"GROUP"}
            getVolumeHandler={this.getVolumeHandler}
            configuration = {this.props.configuration}
          />
        )}

        <i className="fa fa-volume-down"></i>
        <input
          type="range"
          min="1"
          max="100"
          value={this.state.volumeVal}
          step="1"
          ref={this.volumeSlider}
          className="volumeSlider"
          onChange={this.onSetVolume}
        />
        <i className="fa fa-volume-up"></i>
      </div>
    );
  }
}

export default VolumeComponent;
