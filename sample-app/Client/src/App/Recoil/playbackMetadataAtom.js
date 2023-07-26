import { atom } from "recoil"

/**
 * Recoil atom that keeps track of the playback metadata of the currently displayed group on the group player page
 * Can be accessed and modified by calling useRecoilState(playbackMetadataAtom)
 */
const playbackMetadataAtom = atom({
  key: 'playbackMetadataAtom',  // unique ID (with respect to other atoms/selectors)
  default: {
    getPlayBackMetaDataFlag: true,  // {boolean} If true, PlaybackMetadata is called and current metadata is fetched from Sonos API
    trackName: null,  // {string} Currently playing item's name
    trackImage: null,  // {string} URL of currently playing item or item's container if current item's image does not exist
    artistName: null,  // {string} Currently playing item's artist's name
    containerName: null  // {string} Currently playing container's name
  }
});

export default playbackMetadataAtom
