import axios from "axios"
import config from "../../config.json"

/**
 * Fetches the music service provider logos XML file and converts it into a usable format for ServiceLogoComponent
 * Final format is a JSON object with each attribute being a service ID and each value an image src URL
 * @param props.serviceProviderLogosHandler Handler function that updates the state.logos JSON object in ServiceLogoComponent
 */
export default function GetServiceProviderLogos(props) {
  // Fetches logos in XML format from URL specified in config.json
  axios.get(config.serviceLogosURL, {responseType: "document"}).then((response) => {
    // JSON object with format {[serviceId]:[image src URL], ...}
    let res = {};

    // Converts response into an array of "service" objects. Each service object contains 6 logo images of differing sizes
    const list = Array.from(response.request.responseXML.getElementsByTagName("service"));

    // For each service object, its ID is added to res with the src URL of the 112x112 version of its logo as the value
    list.forEach(element => {
      let imagesList = Array.from(element.getElementsByTagName("image"));
      imagesList.forEach(image => {
        if(image.attributes.placement.nodeValue === "BrandLogo-v2" || image.attributes.placement.nodeValue === "square") {
          res[element.id] = image.innerHTML;
        }
      });
    });

    // Updates the state.logos JSON object in ServiceLogoComponent to equal res
    props.serviceProviderLogosHandler(res);
  });
}
