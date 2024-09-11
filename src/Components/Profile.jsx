import React from 'react';

const Profile = () => {
  const authData = JSON.parse(localStorage.getItem('user'));

  if (!authData) {
    return <p>No user data available</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <img src={authData.avatar} alt="User Avatar" />
      <p>Username: {authData.username}</p>
      <p>UserID: {authData.userId}</p>
    </div>
  );
};

export default Profile;
