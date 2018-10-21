import React, { Component } from "react";

class EnterAddress extends Component {
  state = {
    address: ""
  };
  onInputChange = e => {
    this.setState({ address: e.target.value });
  };
  render() {
    const { updateAddress } = this.props;
    const { address } = this.state;
    return (
      <div>
        <p style={{ fontSize: "1.7rem" }}>
          To submit a star, first we have to verify your identification by your wallet address. Please enter your wallet
          address in textbox below:
        </p>
        <input className="SubmitStar__input" onChange={this.onInputChange} value={address} />
        <button className="star__btn" onClick={() => updateAddress(address)}>
          Next
        </button>
      </div>
    );
  }
}

export default EnterAddress;
