import React, { Component } from 'react';


const SingleArtist = (props) => {
  const artist = props.artists.filter(artist => artist.id == props.match.params.id)

  const info = () => {
    if(artist.length){
      return(
        <div className="listen">
          <div className="artist">
            <div className="artist-info">
              <h2>{artist[0].name}</h2>
              <div className='lists'>
                <div className='songs'>
                  <h4>Sample Songs</h4>
                    {songs(artist[0])}
                  <h4>Albums</h4>
                    {albums(artist[0])}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const albums = (artist) => {
    return artist.albums.map((album) => {
      return <ul>
        <li>{album.name} ({album.year})</li>
        <li><a href={`https://open.spotify.com/album/${album.spotify}`} target='_blank'>Spotify</a></li>
      </ul>
    })
  }

  const songs = (artist) => {
    return artist.songs.map((song) => {
      return <ul>
      <li>{song.name} ({song.year})</li>
      <li><a href={`https://open.spotify.com/album/${song.spotify}`} target='_blank'>Spotify</a></li>
      </ul>
    })
  }

  return(
    <div>
    {info()}
    </div>
  )
}

export default SingleArtist;
