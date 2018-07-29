import React, { Component } from 'react';


class ImageThumbnail extends Component {


  render() {
    return(
      <div className="image">
          <h4>Images</h4>
          <ul className="list-unstyled">
              <li><img src={this.props.onImageAdded} className="img-rounded" width="50" /></li>
          </ul>
      </div>
    )
  }
}

export default ImageThumbnail