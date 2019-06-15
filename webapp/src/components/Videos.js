import React, { Component } from 'react';
import axios from 'axios'
import AuthService from './AuthService';

class Videos extends Component {
  
  constructor() {
    super();
    this.state = {
      videos: []
    };
  }

  componentDidMount () {
    const authService = new AuthService();
    axios.get('https://j2dk62o9sk.execute-api.us-east-1.amazonaws.com/dev/video', {
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`
      }
    })
      .then(res => {
        const videos = res.data;
        this.setState({ videos });
      });
  }

  render() {
    return(
      <div>
        <h2>Videos</h2>
        <ul>
          { this.state.videos.map(video => <li key={video.key}>{ video.key }</li>)}
        </ul>
      </div>
    )
  }
}

export default Videos;