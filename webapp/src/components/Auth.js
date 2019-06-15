import React, { Component } from 'react';
import queryString from 'query-string';
import AuthService from './AuthService';

class Auth extends Component {

  componentDidMount() {
    const auth = new AuthService();
    const values = queryString.parse(this.props.location.hash);
    const idToken = values.id_token;
    if (idToken) {
      auth.setToken(idToken);
      setTimeout(function() {
        //After 1 second render videos
        this.props.history.push("/videos");
      }.bind(this), 1000)
    } else {
      this.props.history.push("/forbidden");
    }
  }

  render() {
    return null;
  }
}

export default Auth;