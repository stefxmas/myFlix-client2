import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movie App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Add Links here */}
            {localStorage.getItem("user") ? (
               <>
               <Link to={"/profile"}>Profile</Link>&nbsp;&nbsp;&nbsp;&nbsp;
               <Link to={"#"} onClick={onLoggedOut}>Log Out</Link>&nbsp;&nbsp;&nbsp;&nbsp;
               </>
            ):
            (
              <>
              <Link to="/login" >Log in </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/signup" >Sign up </Link>&nbsp;&nbsp;&nbsp;&nbsp;
            </>
            )
          }
            
           
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
