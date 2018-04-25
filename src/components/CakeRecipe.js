import React from "react";
import { getCakes, resetStateCakesList } from "../actions/cakeActions";
import { connect } from "react-redux";

import { Panel, Row } from "react-bootstrap";

class CakeRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cake: props.cakesArray.filter(
        el => el.id === this.props.match.params.id
      )[0]
    };
  }

  componentWillMount() {
    this.props.getCakes();
  }

  componentDidUnmount() {
    this.props.resetStateCakesList();
  }

  render() {
    let {
      cakeName,
      image,
      shortDescription,
      time,
      level,
      ingArray
    } = this.state.cake;
    return (
      <Panel
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <img
          style={{
            width: "300px",
            height: "200px",
            marginRight: "100px"
          }}
          src={image}
          alt="image cake"
        />
        <div className="text">
          <h2>{cakeName}</h2>
          <br />
          <h4>Składniki:</h4>
          <ul>{ingArray.map(el => <li>{el}</li>)}</ul>
          <br />
          <h4>Sposób przyrządzenia:</h4>
          <p>{shortDescription}</p>
          <br />
          <p>
            To ciasto przygotujesz w <strong>{time}ut.</strong>
          </p>
          <p>
            To ciasto jest <strong> {level.replace("y", "e")} </strong> do
            zrobienia.
          </p>
        </div>
      </Panel>
    );
  }
}

const mapStateToProps = state => {
  return {
    cakesArray: state.cakes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCakes: () => dispatch(getCakes()),
    resetStateCakesList: () => dispatch(resetStateCakesList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeRecipe);
