
class ProcessRequest {
  loadRequest(requestData) {
    // console.log(requestData.data)
    if (this.getMethodType(requestData) === "playbackStatus") {
      try {
        const playBackState =
          requestData.data.playbackState === "PLAYBACK_STATE_PLAYING";
        const res = {
          method: "playBackState",
          data: { "isPlayingFlag" : playBackState },
        };
        return JSON.stringify(res);
      } catch (e) {
        console.debug("Error in fetching the playback state from the event", e);
      }
    }
    else if (this.getMethodType(requestData) === "groupVolume") {
        try {
          const volume = requestData.data.volume;
          const res = {
            method: "volumeControl",
            data: { "volume": volume },
          };
          return JSON.stringify(res);
        } catch (e) {
          console.debug("Error in fetching the volume from the event", e);
        }
      }
      else if (this.getMethodType(requestData) === "metadataStatus") {
        try {
          const trackName = requestData.data.currentItem.track.name;
          const trackImage = requestData.data.currentItem.track.imageUrl;
          const artistName = requestData.data.currentItem.track.artist.name;
          const res = {
            method: "playBackMetaData",
            data: {
              "trackName": trackName,
              "trackImage": trackImage,
              "artistName": artistName,
            },
          };
          return JSON.stringify(res);
        } catch (e) {
          console.debug("Error in fetching the volume from the event", e); 
        }
      }
      else{
        console.error(requestData);
      }
  }

  getMethodType(request) {
    try {
      const methodType = request.headers["x-sonos-type"];
      return methodType;
    } catch (e) {
      console.error("Error in fetching method type...", e);
    }
  }

  getGroupID(request) {
    try {
      const groupID = request.headers["x-sonos-target-value"];
      return groupID;
    } catch (e) {
      console.error("Error in fetching Group ID...", e);
    }
  }
}

export default ProcessRequest;
