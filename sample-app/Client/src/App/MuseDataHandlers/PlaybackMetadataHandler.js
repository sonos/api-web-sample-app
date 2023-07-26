/**
 * Function that converts raw Sonos API playback metadata response into usable format for playbackMetadataAom
 * See https://devdocs.sonos.com/reference/playbackmetadata-getmetadatastatus for Sonos API response example
 * @param requestData {JSON} Sonos API response for getMetadataStatus or metadata event
 * @returns {{containerName: string, trackImage: string, artistName: string, trackName: string, getPlayBackMetaDataFlag: boolean}}
 *    Playback container name, track image url, artist name, track name. Boolean getPlaybackMetaDataFlag always false since metadata has been retrieved
 */
export default function PlaybackMetadataHandler(requestData) {
  try {
    // Sets trackName, artistName, and containerName blank if value in API response does not exist
    const trackName = requestData.currentItem?.track?.name
      ? requestData.currentItem.track.name
      : " ";
    const artistName = requestData.currentItem?.track?.artist?.name
      ? requestData.currentItem.track.artist.name
      : " ";
    const containerName = requestData.container?.name
      ? requestData.container.name
      : " ";

    // Uses current item's image if it exists. Otherwise, uses container image if it exists and null if not.
    const trackImage = requestData.currentItem?.track?.imageUrl
      ? requestData.currentItem.track.imageUrl
      : (requestData.container?.imageUrl ? requestData.container.imageUrl : null);

    // playbackMetadataAtom is set to equal return value
    return {
      trackName: trackName,
      trackImage: trackImage,
      artistName: artistName,
      containerName: containerName,
      getPlayBackMetaDataFlag: false
    };
  } catch (e) {
    console.error("Error in fetching the metadata state from the event", e);
  }
}
