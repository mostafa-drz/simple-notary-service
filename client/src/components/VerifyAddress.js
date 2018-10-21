import React, { Component } from "react";
import { validateTheSignature } from "../api";
class VerifyAddress extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
  }
  state = {
    remained: 300,
    verified: null,
    signature: "",
    error: null
  };
  onSignatureChange = e => {
    this.setState({ signature: e.target.value });
  };
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState(pre => ({ remained: pre.remained - 1 }));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }
  checkTheSignature = () => {
    const { signature } = this.state;
    const { address } = this.props;
    validateTheSignature({ address, signature })
      .then(resp => {
        if (resp.status === 200) {
          this.props.next();
        }
      })
      .catch(error => {
        if (error.response.data) {
          this.setState({ error: error.response.data.error.message });
        } else {
          this.setState({ error: "Something went wrong" });
        }
      });
  };
  render() {
    const { message, next } = this.props;
    const { remained, verified, signature, error } = this.state;
    return (
      <div>
        {error && (
          <p
            style={{
              textAlign: "center",
              color: "#bf360c ",
              backgroundColor: "#fff",
              padding: "2% 4%",
              fontSize: "1.8rem"
            }}
          >
            {error}
          </p>
        )}
        {verified === true && next()}
        {verified === false && (
          <p style={{ fontSize: "1.5rem" }}>
            The verification failed, make sure you signed the message on the wallet you provided the address
          </p>
        )}
        <p style={{ fontSize: "1.4rem" }}>
          Now It's time to verify your identity by signing this message in your wallet. After you signed the message
          please click next.
        </p>
        <div>
          <code style={{ backgroundColor: "#ccc", opacity: ".9", fontSize: "1.4rem", padding: "1% 2%" }}>
            {message}
          </code>
          <p style={{ fontSize: "1.7rem", color: "#ffff00", width: "100%", textAlign: "center", marginTop: "3%" }}>
            You have {Math.floor(remained / 60)}:{remained % 60}, to verify your indentity
          </p>
          <input
            className="SubmitStar__input"
            onChange={this.onSignatureChange}
            placeholder="Type your signature here..."
            value={signature}
          />
          <button className="star__btn" onClick={this.checkTheSignature}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default VerifyAddress;
