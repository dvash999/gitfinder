import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/layout/navbar/Navbar";
import Alert from "./components/Alert";
import Home from "./components/Home";
import About from "./components/pages/About";
import UserProfile from "./components/users/UserProfile";
import UserList from "./components/users/UserList";

import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  gitCredentials;

  constructor() {
    super();
    this.gitCredentials = `client_id=${process.env.REACT_APP_GITHUB_ID} &client_secret=${process.env.REACT_APP_GITHUB_SECRET}`;
  }

  setAlert = (type, msg) => {
    this.setState({ alert: { type, msg } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  getUsers = async searchQuery => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchQuery}&${this.gitCredentials}`
    );

    this.setState({ users: res.data.items, loading: false });
  };

  searchUsers = searchQuery => {
    this.getUsers(searchQuery);
    this.props.history.push("/users");
  };

  getUserProfile = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}?${this.gitCredentials}`
    );

    this.setState({ user: res.data, loading: false });
  };

  getUserRepos = async username => {
    this.setState({ loading: true });

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${this.gitCredentials}`
    );

    this.setState({ repos: res.data, loading: false });
  };

  render() {
    const { users, user, repos, loading } = this.state;

    return (
      <div>
        <Navbar
          title="GitFinder"
          users={users}
          setAlert={this.setAlert}
          searchUsers={this.searchUsers}
        />

        <div className="container-custom">
          {this.state.alert && <Alert alert={this.state.alert} />}

          <Switch>
            <Route exact path="/" render={props => <Home />} />

            <Route
              exact
              path="/users"
              render={props => <UserList users={users} loading={loading} />}
            />

            <Route exact path="/about" component={About} />

            <Route
              exact
              path="/users/:login/profile"
              render={props => (
                <UserProfile
                  {...props}
                  user={user}
                  repos={repos}
                  getUserRepos={this.getUserRepos}
                  getUserProfile={this.getUserProfile}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
