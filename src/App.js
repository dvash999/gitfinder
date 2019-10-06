import React, { Component } from "react";
import Navbar from "./components/layout/navbar/Navbar";
import UserList from "./components/users/UserList";
import axios from 'axios';
import "./App.css";

class App extends Component {
    state = {
        users: [],
        loading: false
    };

    async componentDidMount() {
        this.setState({loading: true});

        const res = await axios.get("https://api.github.com/users");

        this.setState({users: res.data, loading: false})
    }


    render() {
    return (
      <div className="App">
        <Navbar title="Dror" />
        <div className="container">
          <UserList users={this.state.users} loading={this.state.loading}/>
        </div>
      </div>
    );
  }
}

export default App;
