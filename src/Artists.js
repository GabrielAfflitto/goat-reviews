import React, {Component} from 'react';

class Artists extends Component {

  constructor() {
    super()
    this.state = {
      artists: [],
    }
  }
  componentDidMount() {
    this.getArtists()
  }

  getArtists = () => {
    fetch('https://cors-anywhere.herokuapp.com/https://goat-reviews-api.herokuapp.com/api/v1/artists')
    .then((response) => response.json())
    .then((data) => this.setState({artists: data.artists}))
    .catch((error) => console.error({error}))
  }

  render() {
    return (
      <div className="Artists">
      {this.renderedArtists()}
      </div>
    );
  }

  renderedArtists(){
    return this.state.artists.map(artist => (
      <div>
        <p>{artist.name}</p>
        <p>{artist.id}</p>
      </div>
    ))
  }
}


export default Artists;
