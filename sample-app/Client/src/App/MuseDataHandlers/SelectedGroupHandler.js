/**
 * Function that converts raw Sonos API group status response events into usable format for selectedGroupAtom
 * These events are automatically subscribed to when subscribed to any aspect of a group (volume, playback, playback metadata, etc.)
 * @param requestData {JSON} Sonos API response for a group status change event (player added, player removed, and/or group name change)
 * @return {{groupName: string, groupGoneFlag: boolean}}
 *    Name of currently displayed group. Boolean groupGoneFlag true if group has disappeared, false otherwise
 */
export default function SelectedGroupHandler(requestData) {
  try {
    // Group has disappeared. groupGoneFlag = true notifies GroupPlayersComponent to navigate user back to groups page
    if(requestData.groupStatus === "GROUP_STATUS_GONE") {
      // selectedGroupAtom is set to equal this return value
      return {
        groupName: " ",
        groupGoneFlag: true,
      };
    } else {
      // selectedGroupAtom is set to equal this return value
      return {
        groupName: requestData.groupName,
        groupGoneFlag: false,
      };
    }
  } catch (e) {
    console.error("Error in fetching the group status from the event", e);
  }
}
