import React from "react";
import User from "./User";
import Spinner from "../layout/spinner/Spinner";

const UserList = ({ users, loading }) => {
  if (loading) {
    return <Spinner />;
  }
  return (
    <div style={userStyle}>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem"
};

export default UserList;
