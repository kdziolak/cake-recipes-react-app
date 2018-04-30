import React from "react";
import { Row, Col, Panel, Image, Button } from "react-bootstrap";
import { connect } from "react-redux";
import {
  getCakes,
  resetStateCakesList,
  addToFavorite
} from "../actions/cakeActions";
import { Link } from "react-router-dom";

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
      cakesArray: nextProps.cakesArray
    });
  }

  handleButtonClick = e => {
    e.preventDefault();

    this.props.cakesArray.map(el => {
      if (
        e.target.parentNode.childNodes[1].textContent === el.cakeName &&
        el.favorite === undefined
      ) {
        this.props.addToFavorite(
          e.target.parentNode.childNodes[1].textContent,
          false
        );
      } else if (
        e.target.parentNode.childNodes[1].textContent === el.cakeName
      ) {
        this.props.addToFavorite(
          e.target.parentNode.childNodes[1].textContent,
          !el.favorite
        );
      }
    });
  };

  showCakesList = props => {
    if (props.id === undefined) return;
    return (
      <Col md={3}>
        <Link
          style={{
            textDecoration: "none"
          }}
          to={`/Przepisy/${props.id}`}
        >
          <Panel
            style={{
              display: "flex",
              flexDirection: "column",
              jusifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              minHeight: "250px"
            }}
          >
            <Image
              style={{
                width: "100%",
                height: "110px"
              }}
              src={props.image}
              alt="cake"
            />
            <h3
              style={{
                color: "red",
                fontSize: "18px"
              }}
            >
              {props.cakeName}
            </h3>
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
              bsStyle={props.favorite ? "warning" : ""}
            >
              &#9733;
            </Button>
          </Panel>
        </Link>
      </Col>
    );
  };

  render() {
    return <Row>{this.state.cakesArray.map(this.showCakesList)}</Row>;
  }
}

const mapStateToProps = state => {
  return {
    cakesArray: state.cakes,
    favoriteCake: state.cakes.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCakes: () => dispatch(getCakes()),
    resetStateCakesList: () => dispatch(resetStateCakesList()),
    addToFavorite: cakeName => dispatch(addToFavorite(cakeName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakesList);
