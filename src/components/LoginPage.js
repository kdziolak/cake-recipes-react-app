import React from "react";
import { connect } from "react-redux";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Alert
} from "react-bootstrap";
import fire from "../firebase";
import { Redirect } from "react-router-dom";
import { signIn } from "../actions/signInActions";

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: false,
      error: {
        message: ""
      }
    };
  }
  signIn = () => {
    let { email, password } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        this.props.signIn(result);
        this.setState({
          redirect: true
        });
      })
      .catch(error => {
        this.setState({ error });
      });
  };
  render() {
    return (
      <form style={{ width: "40%", margin: "auto", marginTop: "20%" }}>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            onChange={event => this.setState({ email: event.target.value })}
            type="email"
            label="email"
            placeholder="email"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Hasło</ControlLabel>
          <FormControl
            type="password"
            label="password"
            placeholder="password"
            onChange={event => this.setState({ password: event.target.value })}
          />
        </FormGroup>
        {this.state.error.message ? (
          <Alert bsStyle="danger">
            <strong>{this.state.error.message}</strong>
          </Alert>
        ) : null}
        <Button onClick={this.signIn} bsStyle="primary">
          Zaloguj się
        </Button>
        {this.state.redirect ? <Redirect to="/" /> : null}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: user => dispatch(signIn(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
