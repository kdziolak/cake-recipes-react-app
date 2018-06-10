import React, { Component } from "react";
import { connect } from "react-redux";
import { signOut } from "../actions/signInActions";
import fire from "../firebase";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
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
class Header extends React.Component {
  signOut = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        this.props.signOut();
      });
  };
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
            {this.props.login ? <Link to="/dodaj">Dodaj ciasto</Link> : null}
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={2} pullRight>
            {!this.props.login ? (
              <Link to="/logowanie">Zaloguj</Link>
            ) : (
              <button
                onClick={this.signOut}
                style={{ border: "none", background: "none" }}
              >
                wyloguj
              </button>
            )}
          </NavItem>
        </Nav>
        {!this.props.login ? <Redirect to="/logowanie" /> : null}
      </StyledNavbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
