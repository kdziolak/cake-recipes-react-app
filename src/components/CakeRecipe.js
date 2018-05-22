import React from "react";
import { getCakes, resetStateCakesList } from "../actions/cakeActions";
import { connect } from "react-redux";
import { Panel } from "react-bootstrap";
import styled from "styled-components";
const StyledH4 = styled.h4`
  color: #4dd0e1;
  font-size: 23px;
`;
const StyledH2 = styled.h4`
  color: #00acc1;
  font-size: 33px;
  font-weight: bold;
  letter-spacing: 1.3px;
  text-shadow: 0 0 3px #006064;
`;
const StyledPanel = styled(Panel)`
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const StyledParaUnderImg = styled.p`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
`;

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
      <StyledPanel>
        <div>
          <img
            style={{
              width: "300px",
              height: "200px",
              marginRight: "100px"
            }}
            src={image}
            alt="image cake"
          />
          <div>
            <StyledParaUnderImg>
              To ciasto przygotujesz w <strong>{time}ut.</strong>
            </StyledParaUnderImg>
            <StyledParaUnderImg>
              To ciasto jest <strong> {level.replace("y", "e")} </strong> do
              zrobienia.
            </StyledParaUnderImg>
          </div>
        </div>
        <div className="text">
          <StyledH2>{cakeName}</StyledH2>
          <br />
          <StyledH4>Składniki:</StyledH4>
          <ul>{ingArray.map(el => <li>{el}</li>)}</ul>
          <br />
          <StyledH4>Sposób przyrządzenia:</StyledH4>
          <p>{shortDescription}</p>
        </div>
      </StyledPanel>
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
