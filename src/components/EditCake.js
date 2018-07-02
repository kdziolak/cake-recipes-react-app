import React from "react";
import { getCakes, resetStateCakesList } from "../actions/cakeActions";
import { connect } from "react-redux";
import {
  Panel,
  Input,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
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
  margin-top: 10%;
  margin-left: 3%;
  width: 94%;
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
const StyledParaUnderImg = styled.p`
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
`;

class EditCake extends React.Component {
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

  handleImageChange = e => {
    this.setState({
      cake: {
        ...this.state.cake,
        [e.target.id]: e.target.value
      }
    });
  };

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
          <StyledH4>Link do zdjęcia:</StyledH4>
          <FormControl
            style={{ width: "60%", marginBottom: "10px" }}
            id="image"
            type="text"
            value={image}
            onChange={this.handleImageChange}
          />

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
            <StyledParaUnderImg
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <p>To ciasto przygotujesz w</p>
              <FormControl style={{ width: "30%" }} componentClass="select">
                <option value="15min">15 minut</option>
                <option value="30min">30 minut</option>
                <option value="45min">45 minut</option>
                <option value="1godz">1 godzine</option>
              </FormControl>
            </StyledParaUnderImg>
            <StyledParaUnderImg>
              To ciasto jest
              <FormControl style={{ width: "30%" }} componentClass="select">
                <option value="łatwy">łatwe</option>
                <option value="średni">średnie</option>
                <option value="trudny">trudne</option>
              </FormControl>
              do zrobienia.
            </StyledParaUnderImg>
          </div>
        </div>
        <div style={{ width: "60%" }} className="text">
          <StyledH4>Nazwa ciasta:</StyledH4>
          <FormControl
            style={{ width: "40%" }}
            id="cakeName"
            type="text"
            value={cakeName}
            onChange={this.handleValueChange}
          />
          <br />
          <StyledH4>Składniki:</StyledH4>
          <ul>
            {ingArray.map(el => (
              <li>
                <FormControl
                  style={{ width: "40%", marginBottom: "10px" }}
                  type="text"
                  value={el}
                  onChange={this.handleValueChange}
                />
              </li>
            ))}
          </ul>
          <br />
          <StyledH4>Sposób przyrządzenia:</StyledH4>
          <FormControl
            style={{ resize: "none", width: "100%", height: "30vh" }}
            componentClass="textarea"
            placeholder="textarea"
          >
            {shortDescription}
          </FormControl>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCake);
