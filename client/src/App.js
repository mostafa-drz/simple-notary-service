import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import SubmitStar from "./components/SubmitStar";
class App extends Component {
  render() {
    return (
      <div className="App container">
        <h1>Notary Service</h1>
        <BrowserRouter>
          <div className="container">
            <NavBar />
            <Route path="/submit" component={SubmitStar} />
          </div>

          {/* <Route path="/lookup" component={LookupStar} /> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
