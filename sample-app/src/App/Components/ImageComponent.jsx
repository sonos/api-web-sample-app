/**
 * @author Mugdha Rane <mugdha.rane@sonos.com>
 * Code to display images, pass the url of the image as props
 */

import React, { Component } from 'react';

class ImageComponent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <img width="100%" height="100%" src={this.props.url} alt="display image" />
        );
    }
}

export default ImageComponent;