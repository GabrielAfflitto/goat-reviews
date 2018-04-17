import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';

class SingleArtist extends Component {
  constructor() {
    super()
    this.state = {
      show: null
    }
  }

  handleClick(id) {
    this.setState({
      show: id
    });
  }

  artist() {
    return this.props.artists.filter(artist => artist.id == this.props.match.params.id)
  }

  info() {
    if(this.artist().length){
      return(
        <div className="listen">
          <div className="artist">
            <div className="artist-info">
              <h2>{this.artist()[0].name}</h2>
              <div className='lists'>
                <div className='songs'>
                  <h4>Sample Songs</h4>
                    {this.songs(this.artist()[0])}
                  <h4>Albums</h4>
                    {this.albums(this.artist()[0])}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  getUser(id) {
    fetch(`http://localhost:4000/api/v1/users/${id}`)
      .then((response) => response.json())
      .then((data) => cors)
      .catch((error) => console.error({error}))
  }

  renderReviews(album){
    if(album.reviews.length){
      return album.reviews.map((review) => {
        return <div>
          <h3>Reviews</h3>
          <p>Rating: {review.rating}</p>
          <p>Reviewed by {this.getUser(review.user_id)}</p>
          <p className="review-body">{review.body}</p>
        </div>
      })
    }
  }

  albums(artist) {
    return artist.albums.map((album) => {
      return <ul onClick={() => this.handleClick(album.id)}>
        <li>{album.name} ({album.year})</li>
        <li><a href={`https://open.spotify.com/album/${album.spotify}`} target='_blank'>Spotify</a></li>
        <ToggleDisplay show={this.state.show === album.id}>
          {this.renderReviews(album)}
        </ToggleDisplay>
      </ul>
    })
  }

  songs(artist){
    return artist.songs.map((song) => {
      return <ul>
        <li>{song.name} ({song.year})</li>
        <li><a href={`https://open.spotify.com/album/${song.spotify}`} target='_blank'>Spotify</a></li>
      </ul>
    })
  }

  render() {
    return(
      <div>
        {this.info()}
      </div>
    )
  }
}

export default SingleArtist;
