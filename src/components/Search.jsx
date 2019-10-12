import React, { Fragment, useState } from "react";

const Search = ({ searchUsers, showAlert}) => {

  const [text, setText] = useState({
    text: "",
    isAlert: false
  });

  const onSubmit = e => {
    e.preventDefault();

    if (!text)
      return showAlert("Warning", "Something Went Wrong");

    searchUsers(text);
    setText('');
  };

    return (
      <Fragment>
        <form className="d-flex" onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Search Users..."
            className="ml-4"
            value={text}
            onChange={e => setText(e.target.value)}
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

export default Search;
