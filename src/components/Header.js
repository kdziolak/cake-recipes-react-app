import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
const StyledNavbar = styled(Navbar)`
  && {
    background: #e0f7fa;
    border: none;
    border-radius: 0;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    position: fixed;
    z-index: 1;
    width: 100%;
    }
`;
export default class Header extends React.Component {
  render() {
    return (
      <StyledNavbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Ciastuchowo</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>
            <Link to="/">Ciasta</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="/dodaj">Dodaj ciasto</Link>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={2} pullRight>
            <Link to="/logowanie">Zaloguj się</Link>
          </NavItem>
        </Nav>
      </StyledNavbar>
    );
  }
}
