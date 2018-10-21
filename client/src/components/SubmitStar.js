import React, { Component } from "react";
import "./SubmitStar.css";
import EnterAddress from "./EnterAddress";
import VerifyAddress from "./VerifyAddress";
import axios from "axios";
import { requestValidation } from "../api";
class SubmitStar extends Component {
  state = {
    step: 0,
    address: "",
    message: "",
    error: null
  };
  nextStep = () => {
    this.setState(pre => ({ step: pre.step + 1 }));
  };
  onAddressChange = value => {
    this.setState({ address: value });
  };
  updateAddress = address => {
    this.setState({ address });
    requestValidation({ address })
      .then(resp => {
        if (resp.status === 200) {
          this.setState({ message: resp.data.message });
          this.nextStep();
        } else {
          this.setState({ error: resp.data.error.message });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: "Something went wrong :(" });
      });
  };
  render() {
    const { step, error, message, address } = this.state;
    return (
      <div className="container SubmitStar">
        {error && (
          <p
            style={{
              textAlign: "center",
              color: "#bf360c ",
              backgroundColor: "#fff",
              padding: "2% 4%",
              fontSize: "3rem"
            }}
          >
            {error}
          </p>
        )}
        {renderViewBasedOnStep(step, this.nextStep, this.updateAddress, message, address)}
      </div>
    );
  }
}
const renderViewBasedOnStep = (step, next, updateAddress, message, address) => {
  switch (step) {
    case 0:
      return (
        <button className="SubmitStar__start" onClick={next}>
          Start
        </button>
      );
    case 1:
      return <EnterAddress updateAddress={updateAddress} />;
    case 2:
      return <VerifyAddress message={message} address={address} next={next} />;
    default:
      return;
  }
};
export default SubmitStar;
