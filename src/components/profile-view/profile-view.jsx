import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import Button from "react-bootstrap/Button";


const ProfileView = ({movies}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user"))); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle errors
console.log(user)
  useEffect(() => {
    // Fetch user data when component mounts
    const fetchUserData = async () => {
      try {
        // Replace with your actual endpoint and authentication if needed
        const response = await fetch('/users');
        // setUser(response.json());
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) return <p>Loading...</p>; // Display loading message
  if (error) return <p>Error: {error}</p>; // Display error message if there was a problem

  
  return (
    <div className="profile-view">
      {user ? (
        <div>
          <h1>{user.Username}</h1>
          <p>Email: {user.Email}</p>
          {/* <p>Username: {user.UserName}</p> */}
          <p>Birthday: {user.Birthday}</p>
          {/* Add more user details here */}
        </div>
      ) : (
        <p>No user data available</p>
      )}
      <h1>Favorite Movies</h1>
      {
            movies.filter(n => user.FavoriteMovies.includes(n.id)).map(x=> <MovieCard movie={x} />)

      }
    </div>
  );
};

<Button className="back-button" onClick={() => navigate(-1)}> Back
        </Button>

export default ProfileView;