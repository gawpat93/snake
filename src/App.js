import React, { Component } from "react";
import Game from "./components/Game";
import "./App.css";
const refreshRate = 200;
class App extends Component {
  state = {
    points: 0
  };
  changePointsSum = value => {
    let points = this.state.points;
    this.setState({ points: points + value });
  };
  render() {
    return (
      <div className="App">
        <h1 className="text-success">Snake</h1>

        <span className="badge badge-dark">{this.state.points}</span>
        <hr />
        <Game
          data={this.state.data}
          refreshRate={refreshRate}
          changePointsSum={this.changePointsSum}
        />
      </div>
    );
  }
}
export default App;
