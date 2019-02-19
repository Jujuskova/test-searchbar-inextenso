import React, { Component } from 'react'
import UsersList from '../UsersList/UsersList';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      searchText: "",
      message: null
    }
  }

  fetchUsers = () => {
    let { searchText } = this.state;
    let url = `https://api.github.com/search/users?q=${searchText}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
      if(data.total_count === 0) {
        this.setState({users: [], message: "No results"})
      } else if (data.message) {
        this.setState({users: [], message: "Github rate exeeded - reload your page"})
      } else {
        this.setState({users: data.items, message: null}) 
      }
    })
    .catch(err => console.log(err))
  }

  handleInputChange = (e) => {
    this.setState({
      searchText: e.target.value
    }, () => {
      if (this.state.searchText.length === 0) { 
        this.setState({users: []})
      } else {
        this.fetchUsers()
      }
    })
  }

  render() {

    const { users, message } = this.state

    return (
      <div className="search-container">
        <input type="text" placeholder="Search User" onChange={(e) => this.handleInputChange(e)}/>
        {
          users.length > 0 &&
          <UsersList users={users}/>
        }
        {message && <p>{message}</p>}
      </div>
    )
  }
}

export default  Search;