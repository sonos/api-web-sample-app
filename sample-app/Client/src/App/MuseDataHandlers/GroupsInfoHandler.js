export default function GroupsInfoHandler(requestData) {
  try {
    const groups = {};
    requestData.groups.forEach(group => groups[group.id] = group);
    requestData.groups.forEach(group => groups[group.id].playersInGroup = {});
    requestData.groups.forEach(group => group.playerIds.forEach(player => groups[group.id].playersInGroup[player] = player));
    return {
      group_flag: false,
      groups: groups,
      players: requestData.players
    }
  } catch (e) {
    console.error("Error in fetching the group status from the event", e);
  }
}
