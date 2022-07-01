/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * All the constants that are used through the application will be defined here
 */

import config from "../../config.json";
import Helper from "./helper";

export const METHOD_POST = "POST";

export const METHOD_GET = "get";

export const HEADER_BASIC = {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    "Authorization" : "Basic " + config.credentials.b64_encoded_key_secret
};
