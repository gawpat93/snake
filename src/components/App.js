import React, { Component } from "react";
import Game from "./Game";
import Config from "../tools/Config";
const refreshRate = Config.Game.refreshRate;

class App extends Component {
  state = {
    points: 0,
    key: 0
  };
  changePointsSum = value => {
    let points = this.state.points;
    this.setState({ points: points + value });
  };
  resetGame = () => {
    const key = this.state.key;
    this.setState({ key: key + 1, points: 0 });
  };
  render() {
    return (
      <div className="App">
        <h1 className="text-success">Snake</h1>

        <span className="badge badge-dark">{this.state.points}</span>
        <hr />
        <Game
          key={this.state.key}
          data={this.state.data}
          refreshRate={refreshRate}
          changePointsSum={this.changePointsSum}
          getPoints={() => this.state.points}
          resetGame={this.resetGame}
        />
      </div>
    );
  }
}
export default App;
