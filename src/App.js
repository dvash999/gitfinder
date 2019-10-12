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
    this.props.history.push("/users");
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
    this.props.history.push("/");
  };

  setAlert = (type, msg) => {
    this.setState({ alert: { type, msg } });
    setTimeout(() => this.setState({ alert: null }), 3000);
  };

  render() {
    const { users, user, loading } = this.state;

    return (
      <div>
        <Navbar
          title="GitFinder"
          users={users}
          clearUsers={this.clearUsers}
          setAlert={this.setAlert}
          searchUsers={this.searchUsers}
        />
        {this.state.alert && <Alert alert={this.state.alert} />}
        <div className="container">
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
    );
  }
}

export default withRouter(App);
