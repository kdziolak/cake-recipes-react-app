import React from "react";
import { FormGroup, ControlLabel, FormControl, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { loginToPage } from "../actions/loginActions";
import styled from "styled-components";
const StyledForm = styled.form`
  margin-top: 25%;
  margin-left: auto;
  margin-right: auto;
  width: 20%;
`;

class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };
  }

  handleInput = e => {
    switch (e.target.id) {
      case "email": {
        this.setState({
          email: e.target.value
        });
        break;
      }
      case "password": {
        this.setState({
          password: e.target.value
        });
        break;
      }
    }
  };

  loggeIn = () => {
    let { email, password } = this.state;
    this.props.loginToPage(email, password);
  };

  render() {
    return (
      <StyledForm>
        <FormGroup>
          <ControlLabel>Wprowadź adres email:</ControlLabel>
          <FormControl
            onChange={this.handleInput}
            id="email"
            type="email"
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Wprowadź hasło:</ControlLabel>
          <FormControl
            onChange={this.handleInput}
            id="password"
            type="password"
            placeholder="Hasło"
          />
        </FormGroup>
        <Button bsStyle="primary" onClick={this.loggeIn}>
          Zaloguj się
        </Button>
      </StyledForm>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    loginToPage: (email, password) => {
      dispatch(loginToPage(email, password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
