import { atom } from "recoil"

/**
 * Recoil atom that keeps track of all groups and players in the current household
 * Can be accessed and modified by calling useRecoilState(groupsInfoAtom)
 */
const groupsInfoAtom = atom({
  key: 'groupsInfoAtom',  // unique ID (with respect to other atoms/selectors)
  default: {
    groupFlag: true,  // {boolean} If true, getGroups is called and groups information is retrieved from Sonos API
    groups: null,  // {JSON} Each attribute is a group ID, with its value being that group's information. See GroupsInfoHandler for an in-depth explanation
    players: null,  // {Array} List of all players in the current household
    householdId: null // {string} Current household's household ID. Used to filter incoming events to ensure they are for the correct household
  }
});

export default groupsInfoAtom;
