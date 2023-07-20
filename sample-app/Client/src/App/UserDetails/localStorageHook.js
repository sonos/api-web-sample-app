function getGroupIDFlag() {
  return !(
    window.localStorage.householdId === undefined ||
    window.localStorage.householdId === ""
  );
}

function getPlayerIDFlag() {
  return !(
    window.localStorage.groups === undefined ||
    window.localStorage.groups === ""
  );
}

export default function LocalStorageHook(device) {
  if (device === "HOUSEHOLD") {
    return getGroupIDFlag();
  } else if (device === "GROUP") {
    return getPlayerIDFlag();
  }
}
