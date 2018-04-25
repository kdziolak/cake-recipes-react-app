import React from "react";
import { Row, Col, Panel, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { getCakes, resetStateCakesList } from "../actions/cakeActions";
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
    resetStateCakesList: () => dispatch(resetStateCakesList())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakesList);
