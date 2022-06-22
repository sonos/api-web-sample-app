import config from "../../config.json";
import axios from "axios";




const authTokenapiCall = async(props) => {
    let end_point_ = config.api_end_points.create_auth_token_url;

    console.log("API End point is: ", end_point_);
    const headers_ = {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        "Authorization" : "Basic " + props.b64_encoded_string
    };
    const data_ = {
                    grant_type:"authorization_code",
                    code:props.code,
                    redirect_uri:config.credentials.redirect_url
                }
    
    const data = Object.keys(data_)
                .map((key, index) => `${key}=${encodeURIComponent(data_[key])}`)
                .join('&');

    const options = {
        method: 'POST',
        headers: headers_,
        data,
        url: end_point_,
      };
      
    const response = await axios(options);
    console.log(response);
    return response;
};


export default function CreateAuthToken(props) {

    authTokenapiCall(props)
    .then((res) => {
            console.log("API response is: ", res);
            props.is_logged_in_handler(true, res.data);
        });
    
}
