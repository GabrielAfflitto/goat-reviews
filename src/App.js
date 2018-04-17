import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Login from './Login';
import Main from './Main';
import Navbar from './Navbar';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      artists: [],
      names: [],
      user: localStorage.getItem('userId')
    }
  }

  setUser = (user) => {
    this.setState({user: user})
    localStorage.setItem('userId', user)
  }

  componentDidMount() {
    this.getArtists()
  }

  getArtists = () => {
    fetch('http://localhost:4000/api/v1/artists')
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
          <div>
            <Navbar setUser={this.setUser} user={this.state.user}/>
            <Main names={this.state.names} artists={this.state.artists} setUser={this.setUser} user={this.state.user}/>
          </div>
        </Router>
      </div>
    )
  }

}

export default App;
