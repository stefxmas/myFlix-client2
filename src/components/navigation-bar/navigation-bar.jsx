import { Navbar, Container, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from 'react';

export const NavigationBar = ({ user, onLoggedOut, handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
 
  const onSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value); // Call the passed search handler
  };
 
 
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

          {/* Search Form */}
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search Movies"
              className="me-2"
              value={searchQuery}
              onChange={onSearchInputChange}
            />
            <Button variant="outline-success">Search</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
