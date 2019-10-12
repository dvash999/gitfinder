import React, { useState } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/layout/navbar/Navbar";
import Alert from "./components/Alert";
import Home from "./components/Home";
import About from "./components/pages/About";
import UserProfile from "./components/users/UserProfile";
import UserList from "./components/users/UserList";

import "./App.css";

const App = history => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const gitCredentials = `client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`;

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3000);
  };

  const getUsers = async searchQuery => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchQuery}&${gitCredentials}`
    );

    setUsers(res.data.items);
    setLoading(true);
  };

  const searchUsers = searchQuery => {
    getUsers(searchQuery);

    history.push("/users");
  };

  const getUserProfile = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}?${gitCredentials}`
    );

    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${gitCredentials}`
    );

    setRepos(res.data);
    setLoading(true);
  };

  return (
    <div>
      <Navbar
        title="GitFinder"
        users={users}
        showAlert={showAlert}
        searchUsers={searchUsers}
      />
      <div className="container-custom mt-3">
        {alert && <Alert alert={alert} />}
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
                getUserRepos={getUserRepos}
                getUserProfile={getUserProfile}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(App);
