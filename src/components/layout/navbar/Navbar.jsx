import React from "react";
import { Link } from "react-router-dom";
import Search from "../../Search";

const Navbar = ({ icon, title, users, setAlert, clearUsers, searchUsers }) => {
  return (
    <nav className="navbar-custom navbar-color-custom">
      <div className="d-flex">
        <h2 className="ml-2">
          {/*<i className="fa fa-git" />*/}
          GitFinder
        </h2>
        <Search
          searchUsers={searchQuery => searchUsers(searchQuery)}
          setAlert={setAlert}
        />
        {users.length > 0 && (
          <button
            className="btn btn-light btn-block my-1"
            value="Clear"
            onClick={clearUsers}
          >
            Clear
          </button>
        )}
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
