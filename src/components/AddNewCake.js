import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Alert
} from "react-bootstrap";
// import { Form, ValidatedInput } from "react-bootstrap-validation";

import { addNewIngredient } from "../actions/ingredientsActions";

import { addToCakesList } from "../actions/cakeActions";

import IngredientItem from "./IngredientItem";

export class AddNewCake extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      value: {
        cakeName: "",
        ingredient: "",
        prepareDescription: "",
        image: "",
        shortDescription: ""
      },
      inputValue: "",
      send: false,
      valid: {
        cakeName: null,
        prepareDescription: null,
        image: null,
        shortDescription: null
      }
    };
  }

  onChangeIngredientInput = e => {
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value
      }
    });
  };

  showIngredientsList = (props, i) => {
    return <IngredientItem key={i} id={i} value={props} />;
  };

  handleChangeInputs = e => {
    if (e.target.value === "") {
      this.setState({
        valid: {
          ...this.state.valid,
          [e.target.name]: "error"
        }
      });
    } else if (e.target.value !== "") {
      this.setState({
        value: {
          ...this.state.value,
          [e.target.name]: e.target.value
        },
        valid: {
          ...this.state.valid,
          [e.target.name]: null
        }
      });
    }
    this.setState({
      inputValue: e.target.value
    });
  };

  addToRecipes = () => {
    let {
      cakeName,
      shortDescription,
      image,
      prepareDescription
    } = this.state.valid;
    if (
      cakeName === null &&
      shortDescription === null &&
      image === null &&
      prepareDescription === null &&
      this.state.value.cakeName !== "" &&
      this.state.value.shortDescription !== "" &&
      this.state.value.image !== "" &&
      this.state.value.prepareDescription !== ""
    ) {
      let {
        cakeName,
        shortDescription,
        prepareDescription,
        image
      } = this.state.value;
      let time = ReactDOM.findDOMNode(this.time).value;
      let level = ReactDOM.findDOMNode(this.level).value;
      this.props.addToCakesList(
        cakeName,
        shortDescription,
        prepareDescription,
        image,
        time,
        level,
        this.props.newIngredient
      );
      this.setState({
        send: false
      });
    } else {
      this.setState({
        send: true
      });
    }
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <form>
              <FormGroup
                controleId="cakeName"
                validationState={this.state.valid.cakeName}
              >
                <ControlLabel>Nazwa ciasta:</ControlLabel>
                <FormControl
                  type="text"
                  name="cakeName"
                  placeholder="Wpisz nazwe ciasta"
                  onChange={this.handleChangeInputs}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Składniki:</ControlLabel>
                <ul className="ingredients-list">
                  {this.props.newIngredient.map(this.showIngredientsList)}
                </ul>
                <FormControl
                  type="text"
                  name="ingredient"
                  placeholder="Wpisz nazwe składnika"
                  onChange={this.onChangeIngredientInput}
                />
                <Button
                  bsStyle="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    this.props.addNewIngredient(this.state.value.ingredient);
                  }}
                >
                  Dodaj nowy składnik
                </Button>
              </FormGroup>
              <FormGroup validationState={this.state.valid.prepareDescription}>
                <ControlLabel>Sposób przyrządzenia:</ControlLabel>
                <FormControl
                  name="prepareDescription"
                  componentClass="textarea"
                  rows="6"
                  onChange={this.handleChangeInputs}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Czas przydzadzenia:</ControlLabel>
                <FormControl
                  ref={select => {
                    this.time = select;
                  }}
                  name="prepareTime"
                  componentClass="select"
                >
                  <option>15 min</option>
                  <option>30 min</option>
                  <option>45 min</option>
                  <option>1 godzina</option>
                </FormControl>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Poziom trudności:</ControlLabel>
                <FormControl
                  ref={select => {
                    this.level = select;
                  }}
                  name="difficultyLevel"
                  componentClass="select"
                >
                  <option>łatwy</option>
                  <option>średni</option>
                  <option>trudny</option>
                </FormControl>
              </FormGroup>
            </form>
          </Col>
          <Col md={4}>
            <FormGroup validationState={this.state.valid.image}>
              <ControlLabel>Zdjęcie ciasta:</ControlLabel>
              <FormControl
                type="text"
                name="image"
                placeholder="Dodaj URL zdjęcia"
                onChange={this.handleChangeInputs}
              />
            </FormGroup>
            <FormGroup validationState={this.state.valid.shortDescription}>
              <ControlLabel>Krótki opis:</ControlLabel>
              <FormControl
                name="shortDescription"
                componentClass="textarea"
                rows="4"
                onChange={this.handleChangeInputs}
              />
            </FormGroup>
          </Col>
        </Row>
        {this.state.send ? (
          <Alert bsStyle="danger" style={{ width: "300px" }}>
            <strong>Proszę uzupełnić brakujące pola!</strong>
          </Alert>
        ) : null}
        <Button bsStyle="success" onClick={this.addToRecipes}>
          Dodaj do listy przepisów
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    newIngredient: state.ingredients.ingredientsArray
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addNewIngredient: value => {
      dispatch(addNewIngredient(value));
    },
    addToCakesList: (
      cakeName,
      prepareDesc,
      shortDesc,
      image,
      time,
      level,
      ingredientsArray
    ) => {
      dispatch(
        addToCakesList(
          cakeName,
          prepareDesc,
          shortDesc,
          image,
          time,
          level,
          ingredientsArray
        )
      );
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCake);
