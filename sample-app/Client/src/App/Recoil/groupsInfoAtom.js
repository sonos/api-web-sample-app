import { atom } from "recoil"

const groupsInfoAtom = atom({
  key: 'groupsInfoAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    group_flag: true,
    groups: null,
    players: null,
    householdID: null
  }
});

export default groupsInfoAtom;
