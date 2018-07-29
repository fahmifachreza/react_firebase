import React, { Component } from 'react';
// import { func } from 'prop-types';
import axios from 'axios';

class FormUpload extends Component {

  state = {
    selectedFile: null,
  }

  handleFileSelected = e => {
    this.setState({
      selectedFile: URL.createObjectURL(e.target.files[0])
    })
  }

  handleUploadFile = () => {
    const formData = new FormData()
    formData.append('image', this.state.selectedFile, this.state.selectedFile.name)
    axios.post('https://us-central1-sage-courier-161212.cloudfunctions.net/uploadFile', formData, {
      onUploadProgress: ProgressEvent => {
        console.log('Upload Progress: ' + Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + '%' )
      }
    })
    .then( res => {
      console.log('res: ', res)
      this.props.onFileUploaded(this.state.selectedFile)
    })

    this.props.onFileUploaded(this.state.selectedFile)
  }

  render() {

    return (
      <div className="form">
        <h3>Form</h3>
          <input type="file" className="form-control" placeholder="Upload Your Images" name="upload" onChange={this.handleFileSelected} />
          <button id="submit" className="btn btn-default" onClick={this.handleUploadFile}>Upload</button>
      </div>
    )
  }

} 

export default FormUpload