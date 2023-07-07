export default function VolumeHandler(requestData) {
  try {
    const volume = requestData.volume;
    const res = {
      getStartVolumeFlag: false,
      volumeVal: volume
    };
    console.log(res);
    return res;
  } catch (e) {
    console.error("Error in fetching the volume from the event", e);
  }
}
