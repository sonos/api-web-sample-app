import { GroupVolumeApiFactory } from "../museClient/api";
import { PlayerVolumeApiFactory } from "../museClient/api";

/**
 * Calls Sonos API to set the volume of a group or player
 * @param volume {number} Volume value from 0 to 100
 * @param targetId {string} Group ID or player ID to target in API call
 * @param targetType {string} "GROUP" or "PLAYER" to specify which API call to make
 * @param museClientConfig {JSON} Contains access token for Sonos API call
 */
export default function SetVolume(volume, targetId, targetType, museClientConfig) {
  // Body of API call
  const data = { volume: volume };

  if (targetType === "GROUP") {
    // Used to make group volume Sonos API calls with our access token and configuration
    const groupVolumeApi = new GroupVolumeApiFactory(museClientConfig);

    // Executes Sonos API call to specified group
    groupVolumeApi
      .groupVolumeSetVolume(targetId, data)
      .catch(function (error) {
        console.error("Error", error);
      });
  } else {
    // Used to make player volume Sonos API calls with our access token and configuration
    const playerVolumeApi = new PlayerVolumeApiFactory(museClientConfig);

    // Executes Sonos API call to specified player
    playerVolumeApi
      .playerVolumeSetVolume(targetId, data)
      .catch(function (error) {
        console.error("Error", error);
      });
  }
}
