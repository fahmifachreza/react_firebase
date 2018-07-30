import React, { Component } from 'react';


class Canvas extends Component {
  render() {

    return(
      <div className="canvas col-sm-8 col-md-8 col-lg-8">
          <div className="block">
            <img src={this.props.onImageUpdated} width="100%" /> 
          </div>
      </div>
    )
  }
}

export default Canvas