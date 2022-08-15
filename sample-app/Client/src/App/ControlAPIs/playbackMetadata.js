import { PlaybackMetadataApiFactory } from "../museClient/api";

export default function PlayBackMetadata(props) {

  const playBackMetadataApi = new PlaybackMetadataApiFactory(props.museClientConfig);

  playBackMetadataApi.playbackMetadataGetMetadataStatus(props.group_id)
  .then((res) => {
    props.playBackMetadataHandler(
        false,
        res.currentItem.track.name,
        res.currentItem.track.album.name,
        res.container.imageUrl !== undefined ? res.container.imageUrl : res.currentItem.track.imageUrl
      );
  })
  .catch(function (error) {
    console.error("Error", error);
  });
}
