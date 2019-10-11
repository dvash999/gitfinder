import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/layout/navbar/Navbar";
import UserList from "./components/users/UserList";
import UserProfile from "./components/users/UserProfile";
import Alert from "./components/Alert";
import About from "./components/pages/About";
import Search from "./components/Search";

import "./App.css";

class App extends Component {
  state = {
    loading: false,
    alert: null,
    users: [],
    user: {}
  };

  getUsers = async searchQuery => {
    this.setState({ loading: true });

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

  getUserByUsername = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=
            ${process.env.REACT_APP_GITHUB_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );

    this.setState({ user: res.data, loading: false });
  };

  clearUsers = () => {
    this.setState({ loading: true });
    this.setState({ users: [], loading: false });
  };

  setAlert = (type, msg) => {
    this.setState({ alert: { type, msg } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar title="GitFinder" />
          {this.state.alert && <Alert alert={this.state.alert} />}
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <div className="flex">
                      <h2 className=''>
                        {/*<i className="fa fa-git" />*/}
                        GitFinder
                      </h2>
                      <Search
                        searchUsers={searchQuery =>
                          this.searchUsers(searchQuery)
                        }
                        setAlert={this.setAlert}
                      />
                    </div>
                    {users.length > 0 && (
                      <button
                        className="btn btn-light btn-block my-1"
                        value="Clear"
                        onClick={this.clearUsers}
                      >
                        Clear
                      </button>
                    )}
                    <UserList
                      users={this.state.users}
                      loading={this.state.loading}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />

              <Route
                exact
                path="/users/:login"
                render={props => (
                  <UserProfile
                    {...props}
                    user={user}
                    getUserByUsername={username =>
                      this.getUserByUsername(username)
                    }
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
