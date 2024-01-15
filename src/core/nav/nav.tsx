import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
} from "reactstrap";
import '../../shared/styles/style.css';
import "./nav.css";
const NavComp = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // to know the location
  const location = useLocation();
  const isActiveLink = (path:string)=>{
    return location.pathname === path
  }
  return (
    <div className="nav-comp">
      <Navbar color="light" light  expand="md" className="py-0">
        <Container className="d-lg-flex">
          <Link className="logo" to="/">Z-Task</Link>
          <NavbarToggler className="toggle-btn" onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mx-auto d-flex justify-content-between nav-items-wrapper" navbar>
              <NavItem  className= {isActiveLink('/home') ? 'active' : 'nav-item'} >
                <Link to="/home">Home</Link>
              </NavItem>
              <NavItem  className= {isActiveLink('/') ? 'active' : 'nav-item'}>
                <Link to="/">Login</Link>
              </NavItem>
              <NavItem className= {isActiveLink('/signUp') ? 'active' : 'nav-item'} >
                <Link to="/signUp">sign Up</Link>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComp;
