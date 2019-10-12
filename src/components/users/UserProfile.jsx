import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import RepoList from "../repos/RepoList";
import Spinner from "../layout/spinner/Spinner";

class UserProfile extends Component {
  componentDidMount() {
    const credentials = this.props.match.params.login;

    this.props.getUserProfile(credentials);
    this.props.getUserRepos(credentials);
  }

  isHireable = hireable => {
    return hireable ? (
      <i className="fa fa-check text-success" />
    ) : (
      <i className="fa fa-times-circle text-danger" />
    );
  };

  render() {
    const {
      name,
      company,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    const { loading, repos } = this.props;

    if (loading) return <Spinner />;

    return (
      <Fragment>
        <Link to="/users" className="btn btn-light">
          Back to Search
        </Link>

        <div className="card mt-1">
          <div className="grid-2 mt-2">
            <div className="all-center">
              <img
                src={avatar_url}
                alt="profile-pic"
                className="round-img"
                style={{ width: "150px" }}
              />
              <div className="text-left">
                <h1>{name}</h1>
                {location && <p>Location: {location}</p>}
                <p>Hireable: {this.isHireable(hireable)}</p>
              </div>
            </div>

            <div>
              {bio && (
                <div>
                  <h3>Bio</h3>
                  <p>{bio}</p>
                </div>
              )}
              <div>
                <a href={html_url} className="btn btn-dark my-1">
                  Visit Github Profile
                </a>
                <ul>
                  <li>
                    {login && name && (
                      <Fragment>
                        <b>Username: {name}</b>
                      </Fragment>
                    )}
                  </li>
                  <li>
                    {company && (
                      <Fragment>
                        <b>Company: {company}</b>
                      </Fragment>
                    )}
                  </li>
                  <li>
                    {blog && (
                      <Fragment>
                        <b>Website: {blog}</b>
                      </Fragment>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-danger">
              Public Repos: {public_repos}
            </div>
            <div className="badge badge-dark">Public Gist: {public_gists}</div>
          </div>
        </div>
        <RepoList repos={repos} />
      </Fragment>
    );
  }
}

export default UserProfile;
