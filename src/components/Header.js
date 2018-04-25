import React from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class Header extends React.Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Ciastuchowo</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1}>
            <Link to="/">Cisata</Link>
          </NavItem>
          <NavItem eventKey={2}>
            <Link to="/dodaj">Dodaj ciasto</Link>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
