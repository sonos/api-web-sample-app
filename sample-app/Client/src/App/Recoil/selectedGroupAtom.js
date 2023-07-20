import { atom } from "recoil"

const selectedGroupAtom = atom({
  key: 'selectedGroupAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    groupName: null,
    groupId: null,
    groupGoneFlag: false,
  }
});

export default selectedGroupAtom;
