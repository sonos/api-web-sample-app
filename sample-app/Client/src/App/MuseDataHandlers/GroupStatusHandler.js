export default function GroupStatusHandler(requestData) {
  try {
    if(requestData.groupStatus === "GROUP_STATUS_GONE") {
      const res = {
        groupName: " ",
        groupGoneFlag: true,
      };
      console.log(res);
      return res;
    }
    else {
      const res = {
        groupName: requestData.groupName,
        groupGoneFlag: false,
      };
      console.log(res);
      return res;
    }
  } catch (e) {
    console.log("Error in fetching the group status from the event", e);
  }
}
