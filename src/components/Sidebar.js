import React from "react";
import {
  Panel,
  ControlLabel,
  FormGroup,
  FormControl,
  Checkbox
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  filterCakesByCakeName,
  filterCakes,
  showFavoriteRecipes,
  getCakes,
  resetStateCakesList
} from "../actions/cakeActions";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxFavoriteValue: [""],
      checkboxLevelValue: ["", "", ""],
      checkboxTimeValue: ["", "", "", ""]
    };
  }

  handleChangeInput = e => {
    if (e.target.value === "") {
      this.props.resetStateCakesList();
      this.props.getCakes();
    } else {
      this.props.resetStateCakesList();
      this.props.getCakes();
      this.props.filterCakesByCakeName(e.target.value);
    }
  };

  handleCheckbox = e => {
    let whatClassName = e.target.parentNode.parentNode.parentNode.classList;
    let value = parseInt(e.target.name);
    let arr = [];
    let concat = [];
    let notValueCheckbox = true;
    let {
      checkboxFavoriteValue,
      checkboxLevelValue,
      checkboxTimeValue
    } = this.state;
    if (whatClassName.contains("level-form")) {
      arr = checkboxLevelValue.slice();
    } else if (whatClassName.contains("time-form")) {
      arr = checkboxTimeValue.slice();
    } else if (whatClassName.contains("favorite-form")) {
      arr = checkboxFavoriteValue.slice();
    }
    if (e.target.checked) {
      arr[value] = e.target.value;
    } else {
      arr[value] = "";
    }
    if (whatClassName.contains("level-form")) {
      concat = arr.concat(checkboxTimeValue, checkboxFavoriteValue);
    } else if (whatClassName.contains("time-form")) {
      concat = arr.concat(checkboxLevelValue, checkboxFavoriteValue);
    } else if (whatClassName.contains("favorite-form")) {
      concat = arr.concat(checkboxTimeValue, checkboxLevelValue);
    }

    concat.map(el => {
      if (el) {
        notValueCheckbox = false;
        this.props.resetStateCakesList();
        this.props.getCakes();
        this.props.filterCakes(concat);
      }

      if (notValueCheckbox) {
        this.props.resetStateCakesList();
        this.props.getCakes();
      }
    });
    if (whatClassName.contains("level-form")) {
      this.setState({
        checkboxLevelValue: arr
      });
    } else if (whatClassName.contains("time-form")) {
      this.setState({
        checkboxTimeValue: arr
      });
    } else if (whatClassName.contains("favorite-form")) {
      this.setState({
        checkboxFavoriteValue: arr
      });
    }
  };

  render() {
    return (
      <Panel
        style={{
          marginTop: "60px",
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "-5px",
          height: "92vh",
          width: "200px",
          backgroundColor: "#F5F5F5",
          position: 'fixed'
        }}
      >
        <form>
          <FormGroup controlId="prepareTime">
            <FormControl
              style={{
                width: "170px"
              }}
              type="text"
              placeholder="Szukaj ciasta"
              onChange={this.handleChangeInput}
            />
          </FormGroup>
          <FormGroup
            style={{
              marginTop: "40px"
            }}
            className="time-form"
            onClick={this.handleCheckbox}
          >
            <ControlLabel>Czas przygotowania:</ControlLabel>
            <Checkbox name="0" value="15 min">
              15 minut
            </Checkbox>
            <Checkbox name="1" value="30 min">
              30 minut
            </Checkbox>
            <Checkbox name="2" value="45 min">
              45 minut
            </Checkbox>
            <Checkbox name="3" value="1 godzina">
              1 godzina
            </Checkbox>
          </FormGroup>
          <FormGroup
            style={{
              marginTop: "40px"
            }}
            className="level-form"
            onClick={this.handleCheckbox}
          >
            <ControlLabel>Poziom trudności:</ControlLabel>
            <Checkbox name="0" value="łatwy">
              łatwy
            </Checkbox>
            <Checkbox name="1" value="średni">
              średni
            </Checkbox>
            <Checkbox name="2" value="trudny">
              trudny
            </Checkbox>
          </FormGroup>
          <FormGroup
            style={{
              marginTop: "40px"
            }}
            className="favorite-form"
            onClick={this.handleCheckbox}
          >
            <ControlLabel>Ulubione przepisy:</ControlLabel>
            <Checkbox name="0" value="favorite">
              Pokaż
            </Checkbox>
          </FormGroup>
        </form>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getCakes: () => dispatch(getCakes()),
    resetStateCakesList: () => dispatch(resetStateCakesList()),
    filterCakesByCakeName: value => dispatch(filterCakesByCakeName(value)),
    filterCakes: value => dispatch(filterCakes(value)),
    showFavoriteRecipes: value => dispatch(showFavoriteRecipes(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
