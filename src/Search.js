import React, {Component} from 'react'
import {Link} from 'react-router-dom'


class Search extends Component {

  constructor() {
    super()
    this.state = {
      artistSearch: ''
    }
  }

  render() {
    return(
    <form>
      <input list="data" placeholder="search by artist" value={this.state.artistSearch} onChange={this.handleChange}/>
      <datalist id="data">
      {this.nameList()}
      </datalist>
      <button>Submit</button>
    </form>
    )
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
