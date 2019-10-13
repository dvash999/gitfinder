import {
  GET_USERS,
  GET_REPOS,
  SET_LOADING,
  GET_USER_PROFILE,
} from '../types';

export default (state, action) => {
  switch (action.type) {

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case GET_USER_PROFILE:
      return {
        ...state,
        user_profile: action.payload,
        loading: false
      };

    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
