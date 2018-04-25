import React from "react";
import { connect } from "react-redux";
import {
  removeIngredient,
  editIngredient,
  toChangeIngredientName
} from "../actions/ingredientsActions";
import { Button, FormControl } from "react-bootstrap";

class IngredientItem extends React.Component {
  render() {
    return (
      <li>
        {this.props.editButton === this.props.id ? (
          <FormControl
            onChange={this.props.toChangeIngredientName}
            style={{ display: "inline-block", width: "150px" }}
            type="text"
          />
        ) : (
          this.props.value
        )}
        <Button
          bsStyle="danger"
          bsSize="small"
          style={{ margin: "6px", marginLeft: "20px" }}
          onClick={() => this.props.removeIngredient(this.props.value)}
        >
          Usuń
        </Button>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={e => this.props.editIngredient(e.target.textContent, this.props.id)}
        >
          {this.props.editButton === this.props.id ? "Zapisz" : "Edytuj"}
        </Button>
      </li>
    );
  }
}

const mapStateToProps = state => {
  return {
    editButton: state.ingredients.editButton
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeIngredient: value => {
      dispatch(removeIngredient(value));
    },
    editIngredient: (event, index) => {
      dispatch(editIngredient(event, index));
    },
    toChangeIngredientName: event => {
      dispatch(toChangeIngredientName(event));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IngredientItem);
