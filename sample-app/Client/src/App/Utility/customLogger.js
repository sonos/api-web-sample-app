import config from "../../config.json";

export function logMessage(message) {
    if(config.appConfig.logLevel === "debug"){
        console.debug(message);
    }else if(config.appConfig.logLevel === "log"){
        console.log(message);
    }
}

export function logError(message) {
    console.error(message);
}
