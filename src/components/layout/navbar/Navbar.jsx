import React from "react";
import { Link } from "react-router-dom";
import Search from "../../Search";

const Navbar = ({ setAlert, searchUsers }) => {
  return (
    <nav className="navbar-custom navbar-color-custom d-flex justify-content-between">
      <Link to='/' className='m-0 p-0 remove_underscore'><h2 className="ml-2">GitFinder</h2></Link>
      <div className="d-flex flex-grow-1 justify-content-between">
        <div className="flex-grow-1 mx-4">
          <Search
            searchUsers={searchQuery => searchUsers(searchQuery)}
            setAlert={setAlert}
          />
        </div>
        <div className="d-flex align-items-center">
          <ul>
            <li className="mr-3">
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
