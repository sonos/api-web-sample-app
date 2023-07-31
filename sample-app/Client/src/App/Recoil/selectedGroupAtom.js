import { atom } from "recoil"

/**
 * Recoil atom that keeps track of the name and ID of the currently displayed group
 * Can be accessed and modified by calling useRecoilState(selectedGroupAtom)
 */
const selectedGroupAtom = atom({
  key: 'selectedGroupAtom',  // unique ID (with respect to other atoms/selectors)
  default: {
    groupName: null,  // {string} Name of currently displayed group
    groupId: null,  // {string} ID of currently displayed group
    groupGoneFlag: false  // {boolean} If group has disappeared, set to true. If true, user is navigated back to groups page
  }
});

export default selectedGroupAtom;
