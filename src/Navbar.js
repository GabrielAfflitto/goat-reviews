import React, {Component} from 'react';


class Navbar extends Component {
  constructor() {
      super()
      this.state = {
        names: []
      }
  }

  render() {
    return (
      <div>
        <a href="/">Home</a>
        <button onClick={() => this.props.setUser(null)}>Logout</button>
        <a href="/dashboard">Dashboard</a>
      </div>
    )
  }
}

export default Navbar;
