import React from "react";
import {
  Row,
  Col,
  Panel,
  Image,
  Button,
  Modal,
  ButtonToolbar
} from "react-bootstrap";
import { connect } from "react-redux";
import {
  getCakes,
  resetStateCakesList,
  addToFavorite,
  removeCake
} from "../actions/cakeActions";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledPanel = styled(Panel)`
  padding: 20px;
`;
const CardPanel = styled(Panel)`
  background-color: #fbfdfe;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 4px 0px black;
  transition: 0.1s linear;
  &:hover {
    transform: scale(1.05);
  }
`;
const StyledImage = styled(Image)`
  border-radius: 50%;
  width: 60%;
  height: 110px;
  box-shadow: 0 0 10px 0px black;
`;
const StyledH3 = styled.h3`
  color: #26c6da;
`;
const ButtonContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const StyledButton = styled(Button)`
  padding: 2px 7px 2px 7px;
  margin-right: auto;
  margin-bottom: 10px;
  color: white;
  font-size: 15px;
  outline: none;
`;

const StyledLink = styled(Link)`
  padding: 2px 7px 2px 7px;
  margin-right: 10px;
  margin-bottom: 10px;
  color: white;
  font-size: 15px;
  outline: none;
`;

class CakesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cakesArray: [],
      hideModal: false,
      cakeIdToRemove: "",
      cakeIdToEdit: ""
    };
  }

  componentWillMount() {
    this.props.resetStateCakesList();
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

  handleClose = () => {
    this.setState({ hideModal: !this.state.hideModal });
  };

  modalToRemoveCake = e => {
    e.preventDefault();
    this.setState({
      cakeIdToRemove: e.target.classList[0],
      hideModal: !this.state.hideModal
    });
  };

  handleDeleteCake = () => {
    let promise = new Promise((res, rej) => {
      res(this.props.removeCake(this.state.cakeIdToRemove));
    });
    promise
      .then(() => {
        this.handleClose();
      })
      .then(() => {
        this.props.resetStateCakesList();
        this.props.getCakes();
      });
  };

  addToFavorite = e => {
    e.preventDefault();
    this.props.addToFavorite(
      e.target.parentNode.parentNode.childNodes[1].textContent
    );
    let arr = this.state.cakesArray.slice();
    arr.forEach(el => {
      if (
        el.cakeName === e.target.parentNode.parentNode.childNodes[1].textContent
      ) {
        el.favorite = !el.favorite;
      }
    });
    this.setState({
      cakesArray: arr
    });
  };

  editCake = e => {
    e.preventDefault();
    this.setState({
      cakeIdToEdit: e.target.classList[0]
    });
  };

  showCakesList = (props, i) => {
    if (props.id === undefined) return;
    return (
      <Col sm={3} smOffset={0} xs={8} xsOffset={2} key={i}>
        <Link
          style={{
            textDecoration: "none"
          }}
          to={`/Przepisy/${props.id}`}
        >
          <CardPanel>
            <StyledImage src={props.image} alt="cake" />
            <StyledH3>{props.cakeName}</StyledH3>
            <p
              style={{
                color: "black",
                fontSize: "13px"
              }}
            >
              {props.prepareDescription}
            </p>
            <ButtonContainer>
              {this.props.login ? (
                <ButtonToolbar>
                  <StyledLink className="btn btn-primary" to={`/edytuj/${props.id}`}>
                    <span className="fas fa-edit" />
                  </StyledLink>
                </ButtonToolbar>
              ) : null}
              {this.props.login ? (
                <StyledButton
                  id="removeButton"
                  className={props.id}
                  style={{ marginRight: "10px", outline: "none" }}
                  bsStyle="danger"
                  onClick={this.modalToRemoveCake}
                >
                  <span className="fas fa-trash-alt" />
                </StyledButton>
              ) : null}
              <StyledButton
                style={{ outline: "none" }}
                onClick={this.addToFavorite}
                bsStyle={props.favorite ? "warning" : null}
              >
                &#9733;
              </StyledButton>
            </ButtonContainer>
          </CardPanel>
        </Link>

        <Modal show={this.state.hideModal} onHide={this.handleClose}>
          <Modal.Header>
            <Modal.Title>
              <strong>Usunąć dane ciasto z listy?</strong>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Brak możliwości powrotu do poprzedniego stanu!
          </Modal.Body>

          <Modal.Footer
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <Button
              bsStyle="danger"
              style={{ width: "15%" }}
              onClick={this.handleClose}
            >
              Nie
            </Button>
            <Button
              bsStyle="success"
              onClick={this.handleDeleteCake}
              style={{ width: "15%" }}
            >
              Tak
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  };

  render() {
    return (
      <Row style={{ marginTop: "70px" }}>
        {this.state.cakesArray.map(this.showCakesList)}
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    cakesArray: state.cakes,
    login: state.login.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCakes: () => dispatch(getCakes()),
    resetStateCakesList: () => dispatch(resetStateCakesList()),
    addToFavorite: cakeName => addToFavorite(cakeName),
    removeCake: id => removeCake(id)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakesList);
