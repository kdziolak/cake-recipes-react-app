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
  constructor(props) {
    super(props);

    this.state = {
      checkboxLevelState: ["", "", ""],
      checkboxTimeState: ["", "", "", ""]
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

  handleTimeCheckbox = e => {
    this.props.resetStateCakesList();
    this.props.getCakes();
    let value = parseInt(e.target.name);
    let arr = this.state.checkboxTimeState.slice();
    if (e.target.checked) {
      arr[value] = e.target.value;
    } else {
      arr[value] = "";
    }
    arr.map(el => {
      if (el) {
        this.props.filterCakesByTime(arr);
      }
    });
    this.setState({
      checkboxTimeState: arr
    });
  };

  handleLevelCheckbox = e => {
    this.props.resetStateCakesList();
    this.props.getCakes();
    let value = parseInt(e.target.name);
    let arr = this.state.checkboxLevelState.slice();
    if (e.target.checked) {
      arr[value] = e.target.value;
    } else {
      arr[value] = "";
    }
    arr.map(el => {
      if (el) {
        this.props.filterCakesByLevel(arr);
      }
    });
    this.setState({
      checkboxLevelState: arr
    });
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
            onClick={this.handleTimeCheckbox}
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
            onClick={this.handleLevelCheckbox}
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
