import React, {Component} from 'react';
import Search from './Search';

class Home extends Component {

  render() {
    return (
      <div>
      <h1>GOAT Reviews 🐐</h1>
      <h3>Find and review your favorite Hip Hop albums</h3>
      <Search artists={this.props.artists}/>
      </div>
    )
  }
  
}

export default Home;
