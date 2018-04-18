import React, {Component} from 'react'
import './styles/Search.css'


class Search extends Component {

  constructor() {
    super()
    this.state = {
      artistSearch: ''
    }
  }

  render() {
    return(
    <form onSubmit={this.artistLink}>
      <input list="data" placeholder="search by artist" value={this.state.artistSearch} onChange={this.handleChange} className="search"/>
        <datalist id="data">
          {this.nameList()}
        </datalist>
      <button className="submit"><i className="fa fa-search"></i></button>
    </form>
    )
  }

  artistLink = (event) => {
    event.preventDefault()
    let artists = this.props.artists
    let val = this.state.artistSearch
    artists.forEach(artist => {
      if(artist.name.toLowerCase() === val.toLowerCase()) {
        this.props.onSelect(artist)
      }
    })
  }

  nameList = () => {
    return this.props.artists.map(artist => {
      return <option value={`${artist.name}`} key={artist.id}/>
    })
  }

  handleChange = (event) => {
    this.setState({artistSearch: event.target.value})
  }

}

export default Search;
