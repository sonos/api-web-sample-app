/**
 * Function that converts raw Sonos API groups response and into usable format for groupsInfoAtom
 * See https://devdocs.sonos.com/reference/groups-getgroups for Sonos API response example
 * @param requestData {JSON} Sonos API response for getGroups or current household's groups events
 * @returns {{players: Array, groups: JSON, groupFlag: boolean}} Array of all players in current household,
 *    JSON object with each attribute corresponding to a group ID, boolean value is false because groups information is retrieved
 */
export default function GroupsInfoHandler(requestData) {
  try {
    // Sonos API response contains an array of groups, which would make retrieving the information for a specific group difficult without storing its index
    // Each group contains the attribute playerIds, which is an array of string player IDs. Checking if a player is in a group using this would be O(N)
    // Original format: groups: [ {id: string, playerIds: [ string, string, ...], ...}, ...]

    // New format: groups: { (a group's ID): {id: string, playersInGroup: { (a player's ID): string, ...} ...}
    // Instead of an Array, new format for groups is a JSON object where each attribute is a group ID and each value is that group's information
    // Within each group, the playersInGroup field is a JSON object where each attribute is a player ID and each value is also the player ID
    // Allows for O(1) retrieval of group information with just a group ID and O(1) checking of if a player is in a specified group
    const groups = {};
    requestData.groups.forEach(group => groups[group.id] = group);
    requestData.groups.forEach(group => groups[group.id].playersInGroup = {});
    requestData.groups.forEach(group => group.playerIds.forEach(player => groups[group.id].playersInGroup[player] = player));

    // State of groupsInfoAtom will be set to this return value
    return {
      groupFlag: false,
      groups: groups,
      players: requestData.players
    }
  } catch (e) {
    console.error("Error in fetching the group status from the event", e);
  }
}
