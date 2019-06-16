import React, { Component } from 'react';
import axios from 'axios'
import AuthService from './AuthService';
import { sortBy } from 'lodash';

class Videos extends Component {
  
  constructor() {
    super();
    this.authService = new AuthService();
    this.state = {
      videos: [],
      url: undefined
    };
  }

  makeSignedUrl(item) {
    axios.post('https://j2dk62o9sk.execute-api.us-east-1.amazonaws.com/dev/signed-url',
      item,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`
        }
      }
    ).then(res => {
      const { url } = res.data;
      this.setState(prevState => ({
        videos: prevState.videos,
        url
      }));
    });
  }

  componentDidMount () {
    axios.get('https://j2dk62o9sk.execute-api.us-east-1.amazonaws.com/dev/video', {
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    }).then(res => {
      const videos = sortBy(res.data, 'createdAt');
      this.setState({ videos });
    });
  }

  render() {
    return(
      <div className="Video">
        <h2>Videos</h2>
        <div className="row">
          <ul className="column">
            { this.state.videos.map(video => 
              <li onClick={(e)=>this.makeSignedUrl(video)} key={video.key}>{ video.createdAt } | { video.displayName } </li>
            )}
          </ul>
          <div className="column">
            <video src={this.state.url} width="100%" height="480px" controls></video>
          </div>
        </div>
        
      </div>
    )
  }
}

export default Videos;