import React, { Component } from 'react';


class AssetEditor extends Component {
  
  render() {

    return(
      <div className="assets">
        <h3>Assets</h3>
        <div className="text">
            <h4>Text</h4>
            <button id="addText" className="btn btn-default">Add Text</button>
        </div>
      </div>
    )
  }
}

export default AssetEditor;