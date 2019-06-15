
import React from 'react';
import AuthService from './components/AuthService';
import Auth from './components/Auth';
import Videos from './components/Videos';
import UploadVideo from './components/UploadVideo';
import Forbidden from './components/Forbidden';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import './App.css';

const auth = new AuthService();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    auth.loggedIn()
      ? <Component {...props} />
      : <Redirect to={{pathname: '/forbidden', state: { from: props.location } }} />
  )} />
)

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <a href="https://videos.auth.us-east-1.amazoncognito.com/login?response_type=token&client_id=74ot3emm9hbujvmigpq6mbiht4&redirect_uri=http://localhost:3000/auth/callback">Login</a>
          </li>
          <li>
            <Link to="/uploader">Upload a Video</Link>
          </li>
          <li>
            <Link to="/videos">Videos</Link>
          </li>
        </ul>

        <hr />

        <Route path="/auth/callback" component={Auth} />
        <PrivateRoute path="/uploader" component={UploadVideo} />
        <PrivateRoute path="/videos" component={Videos} />
        <Route path="/forbidden" component={Forbidden} />
      </div>
    </Router>
  );
}

export default App;
