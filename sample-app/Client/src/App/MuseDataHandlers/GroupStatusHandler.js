export default function GroupStatusHandler(requestData) {
  try {
    if(requestData.data.groupStatus === "GROUP_STATUS_GONE") {
      const res = {
        groupName: " ",
        groupGoneFlag: true,
        householdID: requestData.headers["x-sonos-household-id"]
      };
      console.log(res);
      return res;
    }
    else {
      const res = {
        groupName: requestData.data.groupName,
        groupGoneFlag: false,
        householdID: requestData.headers["x-sonos-household-id"]
      };
      console.log(res);
      return res;
    }
  } catch (e) {
    console.log("Error in fetching the group status from the event", e);
  }
}