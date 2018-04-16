import React, {Component} from 'react'
import GoogleLogin from 'react-google-login';
import {PostUser} from './PostUser'
import App from './App'

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
        <h1>GOAT Reviews</h1>
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
