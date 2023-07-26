import React, { Component } from "react";

/**
 * Class component that returns and displays an image based on src and alt provided through props
 */
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
