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
  filterCakesByTime,
  filterCakesByLevel,
  getCakes,
  resetStateCakesList
} from "../actions/cakeActions";

class Sidebar extends React.Component {
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

  handleTimeCheckbox = e => {
    if (e.target.checked === true) {
      this.props.resetStateCakesList();
      this.props.getCakes();
      this.props.filterCakesByTime(e.target.value);
    } else {
      this.props.resetStateCakesList();
      this.props.getCakes();
    }
  };

  handleLevelCheckbox = e => {
    if (e.target.checked === true) {
      this.props.resetStateCakesList();
      this.props.getCakes();
      this.props.filterCakesByLevel(e.target.value);
    } else {
      this.props.resetStateCakesList();
      this.props.getCakes();
    }
  };

  render() {
    return (
      <Panel
        style={{
          paddingTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "-15px",
          height: "85vh",
          width: "200px",
          background: "#f9f9f9"
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
          >
            <ControlLabel>Czas przygotowania:</ControlLabel>
            <Checkbox onClick={this.handleTimeCheckbox} value="15 min">
              15 minut
            </Checkbox>
            <Checkbox onClick={this.handleTimeCheckbox} value="30 min">
              30 minut
            </Checkbox>
            <Checkbox onClick={this.handleTimeCheckbox} value="45 min">
              45 minut
            </Checkbox>
            <Checkbox onClick={this.handleTimeCheckbox} value="1 godzina">
              1 godzina
            </Checkbox>
          </FormGroup>
          <FormGroup
            style={{
              marginTop: "40px"
            }}
          >
            <ControlLabel>Poziom trudności:</ControlLabel>
            <Checkbox onClick={this.handleLevelCheckbox} value="łatwy">
              łatwy
            </Checkbox>
            <Checkbox onClick={this.handleLevelCheckbox} value="średni">
              średni
            </Checkbox>
            <Checkbox onClick={this.handleLevelCheckbox} value="trudny">
              trudny
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
    filterCakesByTime: value => dispatch(filterCakesByTime(value)),
    filterCakesByLevel: value => dispatch(filterCakesByLevel(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
