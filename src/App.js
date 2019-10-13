import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';

import Navbar from './components/layout/navbar/Navbar';
import Alert from './components/Alert';
import Home from './components/Home';
import About from './components/pages/About';
import UserProfile from './components/users/UserProfile';
import UserList from './components/users/UserList';

import './App.css';

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <GithubState>
      <div>
        <Navbar
          title="GitFinder"
          showAlert={showAlert}
        />
        <div className="container-custom mt-3">
          {alert && <Alert alert={alert} />}
          <Switch>
            <Route exact path="/" render={props => <Home />} />
            <Route
              exact
              path="/users"
              render={props => <UserList/>}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/users/:login/profile"
              render={props => (
                <UserProfile
                  {...props}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </GithubState>
  );
};

export default App;
