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
    if (e.target.classList.contains("btn-warning")) {
      this.props.addToFavorite(
        e.target.parentNode.childNodes[1].textContent,
        false
      );
    } else {
      this.props.addToFavorite(
        e.target.parentNode.childNodes[1].textContent,
        true
      );
    }
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
              bsStyle={props.favorite ? "warning" : null}
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
    cakesArray: state.cakes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCakes: () => dispatch(getCakes()),
    resetStateCakesList: () => dispatch(resetStateCakesList()),
    addToFavorite: (cakeName, val) => dispatch(addToFavorite(cakeName, val))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakesList);
