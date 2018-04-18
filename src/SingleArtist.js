import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import './styles/SingleArtist.css';
import spotify from './images/spotify.png';

class SingleArtist extends Component {
  constructor() {
    super()
    this.state = {
      show: null,
      users: []
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
              <div className="artist-cont">
                <img src={this.artist()[0].image} className="artist"></img>
                <div className='songs'>
                  <h4 className="topright">Notable Songs</h4>
                    {this.songs(this.artist()[0])}
                </div>
              </div>
              <div className='lists'>
                <h4>Albums</h4>
                <div className="albums">
                  {this.albums(this.artist()[0])}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount(){
    this.getUsers()
  }

  getUsers() {
    fetch(`https://goat-reviews-api.herokuapp.com/api/v1/users`)
      .then((response) => response.json())
      .then((data) => this.setState({users: data.users}))
      .catch((error) => console.error({error}))
  }

  user(id){
    return this.state.users.find(user => user.id === id)
  }

  renderReviews(album){
    if(album.reviews.length){
      return album.reviews.map((review) => {
        const user = this.user(review.user_id);
        return <div key={review.id}>
          <p>Reviewed by {user.name}</p>
          <p>Rating: {review.rating}</p>
          <p className="review-body">{review.body}</p>
        </div>
      })
    }
  }

  albums(artist) {
    return artist.albums.map((album) => {
      return <ul onClick={() => this.handleClick(album.id)} id={`album-${album.id}`} key={album.id}>
        <li>{album.name} ({album.year})</li>
        <li><a href={`https://open.spotify.com/album/${album.spotify}`} target='_blank'>Spotify</a></li>
        <ToggleDisplay show={this.state.show === album.id}>
          <form className="review-form" onSubmit={this.postReview}>
            <strong>What did you think of this album?</strong>
            Comments <textarea placeholder="comment" name="body">
            </textarea>
            Rating <input type="number" min='1' max='5' name="rating"/>
          </form>
          <h3>Reviews</h3>
          {this.renderReviews(album)}
        </ToggleDisplay>
      </ul>
    })
  }

  postReview = (event) => {
    setTimeout('', 5000)
    let body = event.target.children.body.value
    let rating = event.target.children.rating.value
    let user_id = this.props.user
    let req = {body, rating, user_id }
    let albumId = event.target.parentElement.parentElement.id.split('-')[1]
    fetch(`https://goat-reviews-api.herokuapp.com/api/v1/albums/${albumId}/reviews`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(req)
    }).then((response) => response.json())
      .then((data) => this.props.addReview(this.artist().id, data))
      .catch((error) => console.error({error}))
  }

  songs(artist){
    return artist.songs.map((song) => {
      return <table key={song.id}>
        <td>{song.name} ({song.year})</td>
        <td><a href={`https://open.spotify.com/song/${song.spotify}`} target='_blank'><img src={spotify} className="spotify"></img></a></td>
      </table>
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
