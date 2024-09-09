import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from '../movie-card/movie-card';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import ProfileView from '../profile-view/profile-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favoriteMovies, setFavoriteMovies] = useState(user ? user.favoriteMovies : []);

  useEffect(() => {
    if (token) {
      fetch("https://young-taiga-22993-24addf49ed31.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          if (!response.ok) {
            // Handle invalid token or errors
            if (response.status === 401) {
              handleLogout();
            } else {
              throw new Error('Failed to fetch movies');
            }
          }
          return response.json();
        })
        .then((data) => {
          const moviesFromApi = data.map((doc) => ({
            id: doc._id,
            Title: doc.Title,
            ImagePath: doc.ImagePath,
            Director: doc.Director.Name,
            Genre: doc.Genre.Name,
            Description: doc.Description,
          }));

          setMovies(moviesFromApi);
        })
        .catch((error) => {
          console.error('Error fetching movies:', error);
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    window.location.href = "/";
  };

  const handleFavoriteClick = (movie) => {
    if (!token) {
      alert("You need to log in to add favorites.");
      return;
    }

    console.log('Attempting to add favorite:', movie);


    fetch(`https://young-taiga-22993-24addf49ed31.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(updatedUser => {
      setUser(updatedUser);
      setFavoriteMovies(updatedUser.favoriteMovies);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert(`${movie.Title} has been added to your favorites`);
    })
    .catch(err => console.error("Error adding favorite movie:", err));
  };


  const handleRemoveFavoriteClick = (movie) => {
    if (!token) {
      alert("You need to log in to remove favorites.");
      return;
    }

    fetch(`https://young-taiga-22993-24addf49ed31.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(updatedUser => {
      setUser(updatedUser);
      setFavoriteMovies(updatedUser.favoriteMovies);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert(`${movie.Title} has been removed from your favorites`);
    })
    .catch(err => console.error("Error removing favorite movie:", err));
  };



  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView onSignUp={(newUser) => setUser(newUser)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(newUser) => setUser(newUser)} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                    movies={movies}
                    addFavorite={handleFavoriteClick}
                    removeFavorite={handleRemoveFavoriteClick}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard
                          movie={movie}
                          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                          onFavoriteClick={handleFavoriteClick}
                          onRemoveFavoriteClick={handleRemoveFavoriteClick}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Col md={5}>
                  <ProfileView movies={movies} />
                </Col>
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};