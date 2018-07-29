import React, { Component } from 'react';
import logo from './logo.svg';
import FormUpload from './View/FormUpload'
import AssetEditor from './View/AssetEditor'
import Canvas from './View/Canvas'
import './App.css';
import ImageThumbnail from './View/ImageThumbnail';

class App extends Component {

  state = {
    isFileUploaded: false,
    filePath: '',
  }

  updateFile = (temp) => {
    this.setState({
      isFileUploaded: !this.state.isFileUploaded,
      filePath: temp
    })
  }
  render() {
    console.log('test: ', this.state.filePath)
    return (
      <div className="App">

        <div className="sidepane col-sm-3 col-md-3 col-lg-3">
          <FormUpload onFileUploaded={this.updateFile} />
          <hr />
          <AssetEditor />
          <ImageThumbnail onImageAdded={this.state.filePath} />
        </div>

        <Canvas onImageUpdated={this.state.filePath} />

      </div>
    );
  }
}

export default App;
