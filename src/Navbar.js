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
        <a href="/artists">Artists</a>
        <a href="/dashboard">Dashboard</a>
      </div>
    )
  }
}

export default Navbar;
