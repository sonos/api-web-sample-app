/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * Common methods used through the application will be defined here
 */

import axios from "axios";
import Authentication from "../Authentication/authentication";
import config from "../../config.json";

class Helper{
    constructor() {
      this.authentication = new Authentication();
    }
    
    /*
    * api calling is done using the below mthod.
    */
    apiCall(endPoint, headers, method, data) {

      console.debug("Start Helper.apiCall " );
      console.debug("Paramaters - endpoint : " + endPoint + " headers : " + JSON.stringify(headers) + " method : " + method + " data : " + JSON.stringify(data));
      
      const options = {
        method: method,
        headers: headers,
        data: data,
        url: endPoint,
      };
              
      const response = axios(options);

      console.debug("response from the api : ");
      console.debug(response);
      console.debug("End Helper.apiCall " );

      return response;
      
    }

    /*
    * api error logging is done in this method
    */
    logError(error) { 

      console.debug("Start Helper.logError " );

      if (error.response) {
        // Request made and server responded
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
          // The request was made but no response was received
          console.error(error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error", error.message);
      }

      console.error("End Helper.logError " );
    }

    /*
    * This method updates the access token Data in the local storage
    */
    setAccessTokeDatainStorage(accessTokenData){
      window.localStorage.setItem("access_token", JSON.stringify(accessTokenData));
    }

    /*
    * This method returns the access token details stored in the localStorage
    */
    getAccessTokeDatafromStorage(){
      return JSON.parse(window.localStorage.access_token);
    }

    /*
    * This method returns the group details stored in the localStorage
    */
    getGroupsFromStorage(){
      return JSON.parse(window.localStorage.getItem("groups"));
    }

    /*
    * This method updates the groups Data in the local storage
    */
    setGroupstoStorage(groups){
      window.localStorage.setItem("groups", JSON.stringify(groups));
    }

    /*
    * This method return the bearer header with the latest access token
    */
    getHeaderBearer(){
      const bearerHeader = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.authentication.get_access_token(),
      };
      return bearerHeader;
    }

    /*
    * This method returns the oauth url from config.json
    */
    getOAuthUrl(){
      return config.api_end_points.oauth_url + "client_id=" + this.getClientId() + "&response_type=code&state=testState&scope=playback-control-all&"
      + "redirect_uri=" + this.getRedirectURL();
    }

    /*
    * This method returns the oauth url from config.json
    */
    getClientId(){
      return config.credentials.client_id;
    }

    /*
    * This method returns the oauth url from config.json
    */
    getRedirectURL(){
      return config.credentials.redirect_url;
    }

    getB64KeySecretOAuthUrl(){
      return config.credentials.b64_encoded_key_secret;
    }
}

export default Helper;