
class ProcessRequest {
  loadRequest(requestData) {
    if (this.getMethodType(requestData) === "playbackStatus") {
      try {
        const playBackState =
          requestData.data.playbackState === "PLAYBACK_STATE_PLAYING" || requestData.data.playbackState === "PLAYBACK_STATE_BUFFERING";
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
          const trackName = requestData.data.currentItem?.track?.name ? requestData.data.currentItem.track.name : " ";
          const containerName = requestData.data.container?.name ? requestData.data.container.name : " ";
          const artistName = requestData.data.currentItem?.track?.artist?.name ? requestData.data.currentItem.track.artist.name : " ";
          const trackImage = requestData.data.currentItem.track.hasOwnProperty("imageUrl")
           ? requestData.data.currentItem.track.imageUrl
           : requestData.data.container.imageUrl;
          const res = {
            method: "playBackMetaData",
            data: {
              "trackName": trackName,
              "containerName": containerName,
              "trackImage": trackImage,
              "artistName": artistName
            },
          };
          return JSON.stringify(res);
        } catch (e) {
          console.log("Error in fetching the volume from the event", e);
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
