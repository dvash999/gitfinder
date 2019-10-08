import React, { Component } from "react";
import Alert from './Alert';
import updateStateField from '../helpers/stateHandlers';

class Search extends Component {
  state = {
    text: '',
    isAlert: false
  };

  onSubmit = (e) => {
      e.preventDefault();

      if (!this.state.text) return this.props.setAlert('Warning', 'Something Went Wrong');

      this.props.searchUsers(this.state.text);
      this.setState({text: ''})
      // updateStateField({text: ''}, this);
  };

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placholder="Search Users..."
            value={this.state.text}
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
