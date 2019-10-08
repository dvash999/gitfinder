import React, { Component } from "react";
import axios from "axios";

import Navbar from "./components/layout/navbar/Navbar";
import UserList from "./components/users/UserList";
import Search from "./components/Search";
import Alert from "./components/Alert";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  getUsers = async (searchQuery) => {
    // updateStateField('loading', true, this);
    this.setState({loading: true})

    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchQuery}&client_id=
            ${process.env.REACT_APP_GITHUB_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );

      this.setState({ users: res.data.items, loading: false });
  };

  searchUsers = searchQuery => {
      this.getUsers(searchQuery);
  };

  clearUsers = () => {
    this.setState({loading: true})
    this.setState({users: [], loading: false})
  };

  setAlert = (type, msg) => {
    this.setState({alert: { type, msg }})

    setTimeout(() => this.setState({alert: null}), 3000)
  };

  render() {
    return (
      <div className="App">
        <Navbar title="Dror" />
        {this.state.alert && <Alert alert={this.state.alert}/>}
        <div className="container">

          <Search
              searchUsers={searchQuery => this.searchUsers(searchQuery)}
              setAlert={this.setAlert}/>

          <button onClick={this.clearUsers}>Clear</button>
          <UserList users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
