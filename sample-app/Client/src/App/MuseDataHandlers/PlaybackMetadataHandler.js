export default function PlaybackMetadataHandler(requestData) {
  try {
    const trackName = requestData.currentItem?.track?.name
      ? requestData.currentItem.track.name
      : " ";
    const artistName = requestData.currentItem?.track?.artist?.name
      ? requestData.currentItem.track.artist.name
      : " ";
    const containerName = requestData.container?.name
      ? requestData.container.name
      : " ";
    const trackImage = requestData.currentItem?.track?.imageUrl
      ? requestData.currentItem.track.imageUrl
      : (requestData.container?.imageUrl ? requestData.container.imageUrl : null);
    const res = {
      trackName: trackName,
      trackImage: trackImage,
      artistName: artistName,
      containerName: containerName,
      getPlayBackMetaDataFlag: false
    };
    console.log(res);
    return res;
  } catch (e) {
    console.error("Error in fetching the metadata state from the event", e);
  }
}
