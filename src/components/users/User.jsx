import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ user: { login, avatar_url, html_url } }) => {
  return (
    <div className="card text all-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: '60px' }}
      />
      <h3>{login}</h3>

      <div>
        <Link
          to={`/users/${login}/profile`}
          className="btn btn-dark btn-sm my-1"
        >
          more
        </Link>
      </div>
    </div>
  );
};
export default User;
