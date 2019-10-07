import React, { Component } from "react";
import initStateField from '../helpers/stateHandlers';

class Search extends Component {
  state = {
    text: ''
  };

  onSubmit = (e) => {
      e.preventDefault();
      this.props.searchUsers(this.state.text);
      initStateField('text', this);
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placholder="Search Users..."
            onChange={e => this.setState({ [e.target.name]:[e.target.value] })}
          />
          <button
            type="submit"
            value="Search"
            className="btn btn-dark btn-block"
          >Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
