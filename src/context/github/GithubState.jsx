import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import githubReducer from './githubReducer';
import { GET_USERS, GET_USER_PROFILE, GET_REPOS, SET_LOADING } from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user_profile: {},
    repos: [],
    loading: false,
    alert: false
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const gitCredentials = `client_id=${process.env.REACT_APP_GITHUB_ID}&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`;

  const getUsers = async searchQuery => {

    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${searchQuery}&${gitCredentials}`
    );

    dispatch({
      type: GET_USERS,
      payload: res.data.items
    });
  };

  const getUserProfile = async username => {
    setLoading(SET_LOADING);

    const res = await axios.get(
      `https://api.github.com/users/${username}?${gitCredentials}`
    );

    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data
    });
  };

  const getUserRepos = async username => {
    setLoading(SET_LOADING);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&${gitCredentials}`
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user_profile: state.user_profile,
        repos: state.repos,
        loading: state.loading,
        getUsers,
        getUserProfile,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
