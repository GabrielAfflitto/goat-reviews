import React, {Component} from 'react'


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
      <input list="data" placeholder="search by artist" value={this.state.artistSearch} onChange={this.handleChange}/>
      <datalist id="data">
      {this.nameList()}
      </datalist>
      <button>Submit</button>
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
      return <option value={`${artist.name}`}/>
    })
  }

  handleChange = (event) => {
    this.setState({artistSearch: event.target.value})
  }

}

export default Search;
