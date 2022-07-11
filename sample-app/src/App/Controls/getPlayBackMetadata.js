import Helper from "../Utility/helper";
import { METHOD_GET } from "../Utility/constants";

export default function GetPlayBackMetadata(props) {
    ("Start GetPlayBackMetadata");
    const helper = new Helper();

    const endPoint = helper.getGroupsURL() + props.group_id + "/playbackMetadata";

    const headers = helper.getHeaderBearer()

    const data = {};

    helper.apiCall(endPoint, headers, METHOD_GET, data)
    .then((res) => {
        props.setPlayBackMetadataHandler(res.data.currentItem.track.artist.name, res.data.currentItem.track.album.name, res.data.container.imageUrl);
    })
    .catch(function (error) {
        helper.logError(error);
    });

    console.debug("End GetPlayBackMetadata");
}