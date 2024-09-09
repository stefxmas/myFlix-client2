import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export const MovieCard = ({ movie, addFavorite, }) => {
  console.log(movie)

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie._id);
    } else {
      addFavorite(movie._id);
    }
  };

  return (
    
    <Card className="movie-card h-100">

      <Card.Img variant="top" src={movie.ImagePath} />
       <Card.Body>
         <Card.Title>{movie.Title}</Card.Title>
         <Card.Text>{movie.Description}</Card.Text>
         <Link to={`/movies/${encodeURIComponent(movie.id)}`}>

          <Button variant="primary">Open
          </Button>
            </Link>

    
        
       </Card.Body>
     </Card>
     
  );
};

 





MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    // Director: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};