import React from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Header from "./Header";
import CakesList from "./CakesList";
import AddNewCake from "./AddNewCake";
import CakeRecipe from "./CakeRecipe";
import Sidebar from "./Sidebar";
import LoginPage from "./LoginPage";

export default class App extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col md={1}>
            <Route exact path="/" component={Sidebar} />
          </Col>
          <Col md={10} mdOffset={1}>
            <Route exact path="/" component={CakesList} />
          </Col>
          <Col md={12}>
            <Route path="/dodaj" component={AddNewCake} />
            <Route path="/Przepisy/:id" component={CakeRecipe} />
            <Route path="/logowanie" component={LoginPage} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
