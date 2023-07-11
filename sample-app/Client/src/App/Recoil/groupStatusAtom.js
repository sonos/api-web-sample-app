import { atom } from "recoil"

const groupStatusAtom = atom({
  key: 'groupStatusAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    groupName: null,
    groupGoneFlag: false,
  }
});

export default groupStatusAtom;
