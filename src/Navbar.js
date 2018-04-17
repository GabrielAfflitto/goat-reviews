import React, {Component} from 'react';


class Navbar extends Component {
  constructor() {
      super()
      this.state = {
        names: []
      }
  }

  renderLogout() {
    if(this.props.user !== null){
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
      </div>
    )
  }
}

export default Navbar;
