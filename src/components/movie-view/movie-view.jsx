import { Container } from 'react-bootstrap';
import './movie-view.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams, useNavigate } from "react-router";
import Button from "react-bootstrap/Button";

export const MovieView = ({ movies, addFavorite, removeFavorite }) => {
  const { movieId } = useParams();
  const navigate = useNavigate()
  
const movie = movies.find((b) => b.id === movieId);
console.log(movie)
const url = location.href.split("/")[0]+"/"+movie.ImagePath

  return (
    <Container>
      <Row className="my-4">
        <Col md={4} className="d-flex justify-content-center">
          <img 
            src={url} 
            alt={movie.Title} 
            width={250} 
            height={250} 
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <h2>{movie.Title}</h2>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p>{movie.Description}</p>
        
          <Button 
            className="mb-3 me-2" onClick={() => navigate(-1)}>Back
          </Button>

      
          <Button 
            variant="warning"  className="mb-3 me-2" onClick={() => addFavorite(movie)}>Add to Favorite
          </Button>

          
          <Button variant="warning" className="mb-3" onClick={() => removeFavorite(movie)}>Remove from Favorite
          </Button>

        </Col>
      </Row>
    </Container>
  );
};
