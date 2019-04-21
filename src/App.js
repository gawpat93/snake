import React, { Component } from "react";
import Game from "./components/Game";
import "./App.css";

class App extends Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 700,
    height: 500,
    id: "root"
  };

  render() {
    return (
      <div className="App">
        <Game
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
        />
      </div>
    );
  }
}
export default App;
