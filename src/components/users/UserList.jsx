import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import User from './User';
import Spinner from '../layout/spinner/Spinner';

const UserList = () => {
  const githubContext = useContext(GithubContext);

  const { loading, users } = githubContext;

  if (loading) return <Spinner />;

  if (users.length === 0) return <div>0 results for this search</div>;

  return (
    <div style={userStyle}>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default UserList;
