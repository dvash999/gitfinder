import React, { Fragment, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import GithubContext from '../context/github/githubContext';
import AlertContext from '../context/alerts/alertContext';

const Search = ({ history }) => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const { getUsers } = githubContext;
  const { setAlert } = alertContext;

  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    if (!text) return setAlert('Warning', 'Something Went Wrong');

    getUsers(text);
    setText('');

    history.push('/users');
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
};

export default withRouter(Search);
