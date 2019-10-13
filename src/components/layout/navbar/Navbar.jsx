import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../../Search';

const Navbar = ({ showAlert }) => {
  return (
    <nav className="navbar-custom navbar-color-custom d-flex justify-content-between py-2">
      {/*<Link to='/' className='m-0 p-0 remove_underscore'><p className="logo align-self-center">GitFinder</p></Link>*/}
      <div className="container-custom d-flex input-width">
        <div className="d-flex align-items-center mr-3">
          <ul>
            <li>
              <Link to="/" className="p-0">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </div>
        <div className="d-flex flex-grow-1 justify-content-between">
          <div className="flex-grow-1 align-self-center">
            <Search
              showAlert={showAlert}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
