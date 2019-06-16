import React, { Component } from 'react';
import axios from 'axios'
import AuthService from './AuthService';

class UploadVideo extends Component {

  constructor() {
    super();
    this.state = {
      uploading: false
    };
  }

  onChange(e) {
    const authService = new AuthService();
    const url = 'https://j2dk62o9sk.execute-api.us-east-1.amazonaws.com/dev/upload';
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authService.getToken()}`
      }
    }
    this.setState({uploading: true})
    return axios.post(url, formData, config)
      .finally(() => this.setState({uploading: false}))
      .then(function (response) { 
        alert('video uploaded');
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  
  render() {
    let waitingLabel;
    if (this.state.uploading) {
      waitingLabel = <label>video is being uploaded...</label>
    }
    return(
      <div>
        <h2>Uploader</h2>
        <input accept="video/mp4" type="file" name="file" onChange={(e)=>this.onChange(e)} />
        {waitingLabel}
      </div>
    )
  }
}

export default UploadVideo;