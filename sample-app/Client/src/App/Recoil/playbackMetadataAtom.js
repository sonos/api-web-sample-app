import { atom } from "recoil"

const playbackMetadataAtom = atom({
  key: 'playbackMetadataAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    getPlayBackMetaDataFlag: true,
    trackName: null,
    trackImage: null,
    artistName: null,
    containerName: null
  }
});

export default playbackMetadataAtom
