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
      user: null
    }
  }

  addReview = (artistId, review) => {
    const newArray = this.state.artists.map((artist) => {
      if(artist.id !== artistId) return artist
      artist.albums.forEach((album) => {
        if(album.id !== review.album_id) return album
        album.reviews.push(review)
      })
      return artist
    })
    this.setState({artists: newArray})
  }

  setUser = (user) => {
    this.setState({user: user})
    const jsonUser = JSON.stringify(user)
    localStorage.setItem('userId', jsonUser)
  }

  componentDidMount() {
    this.getArtists();
    const user = localStorage.getItem('userId');
    this.setState({user: user })
  }

  getArtists = () => {
    fetch('https://goat-reviews-api.herokuapp.com/api/v1/artists')
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
            {!this.state.user && <Login setUser={this.setUser}/>}
            {this.state.user && <Main names={this.state.names} artists={this.state.artists} setUser={this.setUser} user={this.state.user} addReview={this.addReview}/>}
          </div>
        </Router>
      </div>
    )
  }

}

export default App;
