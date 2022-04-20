import React, { Component } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import {NavLink} from 'react-router-dom';

class HomeNavbar extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

  render() {

    return (
      <Navbar sticky="top"  style={{backgroundColor: "#003638"}}>
        <Container>
        <Navbar.Brand style={{color: "#F1A182", fontFamily: "'Square Peg', cursive", fontSize: "30px"}}>TASK ME</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              {
              this.props.source === 'signin' || this.props.source === 'signup' ?
              <>
                <NavLink to="/" style={{color: "#F1A182", fontFamily: "'Square Peg', cursive", fontSize: "30px"}} className="nav-link">SIGN IN</NavLink>
                <NavLink to="/signup" style={{color: "#F1A182", fontFamily: "'Square Peg', cursive", fontSize: "30px"}} className="nav-link">SIGN UP</NavLink>
                </>
            :
            <NavLink to="/" style={{color: "#F1A182", fontFamily: "'Square Peg', cursive", fontSize: "30px"}} className="nav-link">SIGN OUT</NavLink>


            }
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default HomeNavbar;
