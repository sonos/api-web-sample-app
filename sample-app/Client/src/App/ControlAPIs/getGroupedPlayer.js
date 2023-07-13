import {useRecoilState} from "recoil";
import playerVolumeAtomFamily from "../Recoil/playerVolumeAtomFamily";
import {useEffect} from "react";

export default function GetGroupedPlayer(props) {
  const [playerState, setPlayerState] = useRecoilState(playerVolumeAtomFamily(props.playerID));
  useEffect(() => {
    setPlayerState({
      volumeVal: playerState.volumeVal,
      getStartVolumeFlag: playerState.getStartVolumeFlag,
      inGroup: true
    });
  }, []);
}
