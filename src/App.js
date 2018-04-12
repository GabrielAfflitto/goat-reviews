import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './Main';
import Navbar from './Navbar';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      artists: [],
      names: []
    }
  }

  componentDidMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://goat-reviews-api.herokuapp.com/api/v1/artists')
    .then((response) => response.json())
    .then((data) => this.setState({artists: data.artists}))
    .then(() => this.artistNames())
    .catch((error) => console.error({error}))
  }

  artistNames() {
    const names = this.state.artists.map((artist) => {
      return {name: artist.name, id: artist.id}
    })
    this.setState({ names })
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
        </Router>
        <Main names={this.state.names}/>
      </div>
    )
  }

}

export default App;
