import React, {Component} from 'react';
import GoogleLogin from 'react-google-login';
import {PostUser} from './PostUser';
import App from './App';
import './styles/Login.css';

class Login extends Component {

  signIn = (response) => {
    let userData = {
      'name': response.w3.ofa,
      'email': response.w3.U3,
      'token': response.accessToken
    }
    let userId;
    PostUser(userData, response.accessToken)
      .then(res => {
        userId = JSON.parse(res).id
        this.validateUser(userId, userData, response)
      })
    }

    validateUser = (userId, userData, response) => {
      if (userData.token === response.accessToken) {
        this.props.setUser(userId)
    }
  }

  render() {
    return(
      <div>
        <div className="hero-image">
          <div className="hero-text">
            <h1 className="title">GOAT Reviews 🐐</h1>
            <h3 className="message">Find and review your favorite Hip Hop albums</h3>
          </div>
        </div>
          <div className="login-btn">
            <GoogleLogin
              className="google-lgn"
              clientId="400945952157-d5oi341vtcch247tcgr5fuq6m8cnd4b2.apps.googleusercontent.com"
              buttonText="Google Login"
              onSuccess={this.signIn}
              onFailure={this.signIn}
            />
          </div>
      </div>
    )
  }
}

export default Login
