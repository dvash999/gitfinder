import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GithubState from './context/github/GithubState';
import AlertState from './context/alerts/AlertState';

import Navbar from './components/layout/navbar/Navbar';
import Alert from './components/Alert';
import Home from './components/pages/Home';
import About from './components/pages/About';
import UserProfile from './components/users/UserProfile';
import UserList from './components/users/UserList';

import './App.css';
import NotFound from "./components/pages/404";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Navbar title="GitFinder" />
        <div className="container-custom mt-3">
          <Alert />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/about" component={About} />
            <Route exact path="/users/:login/profile" render={props => <UserProfile {...props} />}/>
            <Route path='**' component={NotFound} />
          </Switch>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;
