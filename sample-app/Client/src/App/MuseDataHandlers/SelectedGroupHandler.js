export default function SelectedGroupHandler(requestData) {
  try {
    if(requestData.groupStatus === "GROUP_STATUS_GONE") {
      const res = {
        groupName: " ",
        groupGoneFlag: true,
      };
      return res;
    } else {
      const res = {
        groupName: requestData.groupName,
        groupGoneFlag: false,
      };
      return res;
    }
  } catch (e) {
    console.error("Error in fetching the group status from the event", e);
  }
}
