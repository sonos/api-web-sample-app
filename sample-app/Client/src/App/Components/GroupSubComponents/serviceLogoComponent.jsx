import React, { Component } from "react";
import GetServiceProviderLogos from "../../UserDetails/getServiceProviderLogos";

/**
 * Class component that fetches the current list of music service provider logos
 * Displays the logo corresponding to the currently playing music service
 */
class ServiceLogoComponent extends Component {
  /**
   * @param props.serviceId {number} Music service provider ID of currently playing song from playbackMetadataAtom. Used to display specific music service logo
   */
  constructor(props) {
    super(props);

    // fetchFlag = true ensures new data is fetched on instantiation
    // logos is a JSON object with each attribute a music service ID and each value a corresponding logo image src URL
    this.state = {fetchFlag: true, logos: {}};
  }

  /**
   * Handler function that updates fetchFlag and logos in GetServiceProviderLogos
   * @param data {JSON} Each attribute is a music service ID and each value is a corresponding logo image src URL
   */
  serviceProviderLogosHandler = (data) => {
    this.setState({fetchFlag: false, logos: data});
  }

  render() {
    return (
      <div>
        {/* On instantiation, fetches new logos data and sets fetchFlag to false */}
        {this.state.fetchFlag && (
          <GetServiceProviderLogos
            serviceProviderLogosHandler = {this.serviceProviderLogosHandler}
          />
        )}

        {/* Once data has been fetched, if an image exists for the current music service ID, that image is displayed */}
        {!this.state.fetchFlag && this.state.logos.hasOwnProperty(this.props.serviceId) && (
          <div className="msp_logo">
            <img
              width="40px"
              height="40px"
              src={this.state.logos[this.props.serviceId]}
              alt={this.props.serviceName}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ServiceLogoComponent;
