import React, { Component } from "react";
import Game from "./components/Game";
import "./App.css";
const refreshRate = 200;
class App extends Component {
  state = {
    id: "root"
  };

  render() {
    return (
      <div className="App">
        <h1 className="text-success">Snake</h1>
        <hr />
        <Game data={this.state.data} refreshRate={refreshRate} />
      </div>
    );
  }
}
export default App;
