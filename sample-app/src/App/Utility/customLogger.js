import config from "../../config.json";

export function logMessage(message) {
    if(config.app_config.log_level === "debug"){
        console.debug(message);
    }else if(config.app_config.log_level === "log"){
        console.log(message);
    }
}

export function logError(message) {
    console.error(message);
}
