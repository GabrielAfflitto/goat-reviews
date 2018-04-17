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
        <button onClick={() => this.props.setUser(null)}>Logout</button>
      )
    }
  }

  render() {
    return (
      <div>
        <a href="/">Home</a>
        {this.renderLogout()}
        <a href="/dashboard">Dashboard</a>
      </div>
    )
  }
}

export default Navbar;
