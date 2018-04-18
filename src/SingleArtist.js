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
    document.getElementById(`album-${id}`).classList.toggle('gray')
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
              <h1 className="artist-name">{this.artist()[0].name}</h1>
              <div className="artist-cont">
                <img src={this.artist()[0].image} className="artist" alt="bear"></img>
                <div className='songs'>
                  <h3>Notable Songs</h3>
                    {this.songs(this.artist()[0])}
                </div>
              </div>
              <div className='lists'>
                <h4 className="album-header">Albums</h4>
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
          <h6 className="rating">Rating: {review.rating}</h6>
          <h6 className="review-body">{review.body}</h6>
        </div>
      })
    }
  }

  albums(artist) {
    return artist.albums.map((album) => {
      return <ul onClick={() => this.handleClick(album.id)} id={`album-${album.id}`} key={album.id}>
        <li className="album">{album.name} ({album.year})</li>
        <li className="spot"><a href={`https://open.spotify.com/album/${album.spotify}`} target='_blank'><img src={spotify} className="spotify" alt="spotify icon"></img></a></li>
        <li><ToggleDisplay show={this.state.show === album.id}>
          <div className="popup">
            <form className="review-form" onSubmit={this.postReview}>
              <strong>What did you think of this album?</strong>
              <textarea placeholder="comment" name="body">
              </textarea>
              Rating <input type="number" min='1' max='10' name="rating"/>
            </form>
          <h3>Reviews</h3>
          {this.renderReviews(album)}
          </div>
        </ToggleDisplay></li>
      </ul>
    })
  }

  postReview = (event) => {
    event.preventDefault();
    setTimeout(() => window.location.reload(), 1000);
    let body = event.target.children.body.value
    let rating = event.target.children.rating.value
    let user_id = this.props.user
    let req = {body, rating, user_id }
    let albumId = event.target.parentElement.parentElement.parentElement.parentElement.id.split('-')[1]
    fetch(`https://goat-reviews-api.herokuapp.com/api/v1/albums/${albumId}/reviews`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(req)
    }).then((response) => response.json())
      .catch((error) => console.error({error}))
  }

  songs(artist){
    return artist.songs.map((song) => {
      return <table key={song.id}>
        <td>{song.name} ({song.year})</td>
        <td><a href={`https://open.spotify.com/song/${song.spotify}`} target='_blank'><img src={spotify} className="spotify" alt="spotify icon"></img></a></td>
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
