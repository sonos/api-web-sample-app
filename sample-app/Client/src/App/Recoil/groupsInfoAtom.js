import { atom } from "recoil"

const groupsInfoAtom = atom({
  key: 'groupsInfoAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    groupFlag: true,
    groups: null,
    players: null,
    householdId: null
  }
});

export default groupsInfoAtom;
