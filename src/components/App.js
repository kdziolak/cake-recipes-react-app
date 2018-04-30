import React from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { Route } from "react-router-dom";

import Header from "./Header";
import CakesList from "./CakesList";
import AddNewCake from "./AddNewCake";
import CakeRecipe from "./CakeRecipe";
import Sidebar from "./Sidebar";

export default class App extends React.Component {
  render() {
    return (
      <Grid fluid>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col md={2}>
            <Route exact path="/" component={Sidebar} />
          </Col>
          <Col md={1} />
          <Col md={9}>
            <Route exact path="/" component={CakesList} />
            <Route path="/dodaj" component={AddNewCake} />
            <Route path="/Przepisy/:id" component={CakeRecipe} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
