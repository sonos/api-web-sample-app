import { atom } from "recoil"

const MBEResponse = atom({
 key: 'MBEResponse', // unique ID (with respect to other atoms/selectors)
 default: false, // default value (aka initial value)
});

export default MBEResponse
