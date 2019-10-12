import React, { Component, Fragment } from "react";

class Search extends Component {
  state = {
    text: "",
    isAlert: false
  };

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.text)
      return this.props.setAlert("Warning", "Something Went Wrong");

    this.props.searchUsers(this.state.text);
    this.setState({ text: "" });
  };

  render() {
    return (
      <Fragment>
        <form className="d-flex" onSubmit={this.onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            className="ml-4"
            value={this.state.text}
            onChange={e => this.setState({ [e.target.name]: [e.target.value] })}
          />
          <button
            type="submit"
            value="Search"
            className="btn btn-dark btn-custom"
          >
            Search
          </button>
        </form>
      </Fragment>
    );
  }
}

export default Search;
