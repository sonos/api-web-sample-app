/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * Code to display images, pass the url of the image as props
 */

import React, { Component } from "react";

class ImageComponent extends Component {
  render() {
    return (
      <img
        width="100%"
        height="100%"
        src={this.props.src}
        alt={this.props.alt}
      />
    );
  }
}

export default ImageComponent;
