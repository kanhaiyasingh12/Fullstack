import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetches from {VITE_API_BASE_URL}/users/profile/1
    api.get('/users/profile/1')
      .then(response => {
        setUser(response.data);
      })
      .catch(err => {
        setError("Backend connection failed. Check your Node.js server.");
        console.error("API Error:", err);
      });
  }, []);

  if (error) return <div style={{ color: 'red', padding: '10px' }}>{error}</div>;
  if (!user) return <div>Loading user from database...</div>;

  return (
    <div style={{ padding: '20px', border: '1px solid #444', borderRadius: '8px' }}>
      <h2>{import.meta.env.VITE_APP_TITLE}</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
};

export default Profile;
