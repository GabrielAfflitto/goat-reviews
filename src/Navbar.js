import React, {Component} from 'react';


class Navbar extends Component {
  constructor() {
      super()
      this.state = {
        names: []
      }
  }

  renderLogout() {
    if(this.props.user){
      return(
        <button onClick={() => this.props.setUser(null)} className="w3-bar-item w3-button w3-padding-large">Logout</button>
      )
    }
  }

  render() {
    return (
      <div className="w3-bar w3-black w3-card">
        <a href="/" className="w3-bar-item w3-button w3-padding-large">Home</a>
        {this.renderLogout()}
        <span className="w3-padding-large w3-hover-red w3-hide-small w3-right">GOAT <span role='img' aria-label="goat">🐐</span></span>
      </div>
    )
  }
}

export default Navbar;
