import React, { Component } from 'react';
import Main from './Main';
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
      <Main names={this.state.names}/>
    )
  }

}

export default App;
