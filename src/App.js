import React, { Component } from "react";
import Navbar from "./components/layout/navbar/Navbar";
import UserList from "./components/users/UserList";
import Search from "./components/Search";
import axios from "axios";
import {initStateField, startSpinner, stopSpinner} from './helpers/stateHandlers';

import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false
  };

  getUsers = async (searchQuery) => {
    startSpinner(this);

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
    startSpinner(this);
    initStateField('users');
    stopSpinner(this);
  }

  render() {
    return (
      <div className="App">
        <Navbar title="Dror" />
        <div className="container">
          <Search searchUsers={searchQuery => this.searchUsers(searchQuery)} />
          <UserList users={this.state.users} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
