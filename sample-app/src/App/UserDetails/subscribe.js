/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * This class handles the subscription api calls
 */
 import Helper from "../Utility/helper";
 import { METHOD_POST } from "../Utility/constants";
 import { useEffect, useState } from "react";

 export default function Subscribe(props) {

    console.log("Start Subscribe");

    const [response, setResponse] = useState([]);
    const [error, setError] = useState([]);
    const helper = new Helper();
  
    useEffect(() => {

      let mounted = true;
      
      var groups = JSON.parse(window.localStorage.getItem("groups"))[0];
      for (let x in groups) {
        
        if( x === "id"){

          let endPointPB = helper.getGroupsURL() + groups[x] + "/playback/subscription";

          let endPointGV = helper.getGroupsURL() + groups[x] + "/groupVolume/subscription";

          let endPointMD = helper.getGroupsURL() + groups[x] + "/playbackMetadata/subscription";
  
          const headers = helper.getHeaderBearer()

          const data = {};

          helper.apiCall(endPointPB, headers, METHOD_POST, data)
            .then((res) => {
              if (mounted) {
                setError(false);
              }
            })
            .catch(function (error) {
              console.error("Something went wrong");
              setError(true);
              return Promise.reject(error);
            });

          helper.apiCall(endPointGV, headers, METHOD_POST, data)
            .then((res) => {
              if (mounted) {
                setError(false);
              }
            })
            .catch(function (error) {
              console.error("Something went wrong");
              setError(true);
              return Promise.reject(error);
            });

          helper.apiCall(endPointMD, headers, METHOD_POST, data)
          .then((res) => {
            if (mounted) {
              setError(false);
            }
          })
          .catch(function (error) {
            console.error("Something went wrong");
            setError(true);
            return Promise.reject(error);
          });
        }
      }
      
      return () => (mounted = false);
    }, []);
 

    console.log("End Subscribe");
 }