import React from "react";
import { Row, Col, Panel, Image, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getCakes,
  resetStateCakesList,
  addToFavorite
} from "../actions/cakeActions";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledPanel = styled(Panel)`
  padding: 20px;
`;
const CardPanel = styled(Panel)`
  background-color: #fbfdfe;
  padding: 10px;
  display: "flex";
  flex-direction: column;
  jusify-content: center;
  align-items: center;
  text-align: center;
  min-height: 250px;
  box-shadow: 0 0 4px 0px black
  transition: 0.1s linear;
  &:hover {
    transform: scale(1.05);
  }
`;
const StyledImage = styled(Image)`
  border-radius: 50%;
  width: 60%;
  height: 110px;
  box-shadow: 0 0 10px 0px black
`;
const StyledH3 = styled.h3`
  color: #26C6DA;
`;

class CakesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cakesArray: []
    };
  }

  componentWillMount() {
    this.props.getCakes();
  }

  componentWillUnmount() {
    this.props.resetStateCakesList();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cakesArray: nextProps.cakesArray.sort((cakeA, cakeB) => {
        if (cakeA.cakeName < cakeB.cakeName) return -1;
        if (cakeA.cakeName > cakeB.cakeName) return 1;
        return 0;
      })
    });
  }

  handleButtonClick = e => {
    e.preventDefault();
    this.props.addToFavorite(e.target.parentNode.childNodes[1].textContent);
    let arr = this.state.cakesArray.slice();
    arr.forEach(el => {
      if (el.cakeName === e.target.parentNode.childNodes[1].textContent) {
        el.favorite = !el.favorite;
      }
    });
    this.setState({
      cakesArray: arr
    });
  };

  showCakesList = (props, i) => {
    if (props.id === undefined) return;
    return (
      <Col md={3} key={i}>
        <Link
          style={{
            textDecoration: "none"
          }}
          to={`/Przepisy/${props.id}`}
        >
          <CardPanel
          >
            <StyledImage
              src={props.image}
              alt="cake"
            />
            <StyledH3>
              {props.cakeName}
            </StyledH3>
            <p
              style={{
                color: "black",
                fontSize: "13px"
              }}
            >
              {props.prepareDescription}
            </p>
            <Button
              onClick={this.handleButtonClick}
              style={{
                padding: "1px 5px 1px 5px",
                alignSelf: "left",
                marginLeft: "10px",
                marginBottom: "10px",
                color: "white",
                fontSize: "15px",
                outline: "none"
              }}
              bsStyle={props.favorite ? "warning" : null}
            >
              &#9733;
            </Button>
          </CardPanel>
        </Link>
      </Col>
    );
  };

  render() {
    return (
      <StyledPanel>
          <Row>{this.state.cakesArray.map(this.showCakesList)}</Row>
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
    resetStateCakesList: () => dispatch(resetStateCakesList()),
    addToFavorite: cakeName => addToFavorite(cakeName)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakesList);
