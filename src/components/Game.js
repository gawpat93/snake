import React, { Component } from "react";
import * as d3 from "d3";
import "./style.css";
import "bootstrap";
const w = 300,
  h = 300,
  res = 20;

class Game extends Component {
  constructor() {
    super();
    this.state = {
      snake: {
        direction: {
          x: 1,
          y: 0
        },
        head: {
          x: 2,
          y: 0
        },
        tail: [],
        dead: false
      },
      food: this.getFood(false)
    };
  }
  getFood = (check = true) => {
    let getValue = max => Math.round((Math.random() * (max - res)) / res);
    let x = getValue(w);
    let y = getValue(h);
    while (check) {
      const snake = this.getSnake();
      let insideSnake = snake.find(e => e.x === x && e.y === y);
      if (insideSnake) {
        x = getValue(w);
        y = getValue(h);
      } else {
        check = false;
      }
    }

    return {
      x: x,
      y: y
    };
  };
  getSnake = () => {
    const snake = this.state.snake;
    if (snake.tail === null || snake.tail.length === 0) {
      return [snake.head, snake.head];
    }
    return [snake.head, snake.head, ...snake.tail];
  };
  moveSnake = () => {
    let snake = this.state.snake;
    let nextHead = {
      x: this.state.snake.head.x + this.state.snake.direction.x,
      y: this.state.snake.head.y + this.state.snake.direction.y
    };
    if (nextHead.x >= w / res) {
      nextHead.x = 0;
    }
    if (nextHead.x < 0) {
      nextHead.x = w / res - 1;
    }

    if (nextHead.y >= h / res) {
      nextHead.y = 0;
    }

    if (nextHead.y < 0) {
      nextHead.y = h / res - 1;
    }

    const tailEaten = snake.tail.find(
      e => e.x === nextHead.x && e.y === nextHead.y
    );
    if (tailEaten) {
      snake.dead = true;
    }
    const foodEaten =
      this.state.food.x === nextHead.x && this.state.food.y === nextHead.y;
    if (foodEaten) {
      this.props.changePointsSum(1);
      if (snake.tail.length === 0) {
        snake.tail = [snake.head];
      } else if (snake.tail.length > 0) {
        snake.tail = [snake.head, ...snake.tail];
      }
    } else {
      if (snake.tail.length === 1) {
        snake.tail = [snake.head];
      } else if (snake.tail.length > 1) {
        snake.tail = [snake.head, ...snake.tail];
        snake.tail.pop();
      }
    }

    snake.head = nextHead;
    if (foodEaten) {
      this.setState({ snake, food: this.getFood() });
    } else {
      this.setState({ snake });
    }
  };
  changeDirection = (_x, _y) => {
    let snake = this.state.snake;
    if (
      (snake.direction.x === -_x && _x !== 0) ||
      (snake.direction.y === -_y && _y !== 0)
    ) {
      return;
    }
    snake.direction.x = _x;
    snake.direction.y = _y;

    this.setState({ snake });
  };
  componentDidMount() {
    document.addEventListener("keyup", e => {
      if (e.key === "ArrowUp") {
        this.changeDirection(0, -1);
      } else if (e.key === "ArrowDown") {
        this.changeDirection(0, 1);
      } else if (e.key === "ArrowLeft") {
        this.changeDirection(-1, 0);
      } else if (e.key === "ArrowRight") {
        this.changeDirection(1, 0);
      }
    });
    this.svg = d3
      .select("#board")
      .append("svg")
      .attr("class", "board")
      .attr("width", w)
      .attr("height", h);
    this.interval = setInterval(() => {
      this.moveSnake();
      this.draw();
      if (this.state.snake.dead) {
        clearInterval(this.interval);
      }
    }, this.props.refreshRate);
  }

  draw() {
    this.svg.selectAll("rect").remove();
    let food = this.state.food;
    this.svg
      .append("rect")
      .attr("x", food.x * res)
      .attr("y", food.y * res)
      .attr("width", res)
      .attr("height", res)
      .style("stroke", "#28a745")
      .style("stroke-width", 1)
      .attr("fill", "#c3e6cb");
    let data = this.getSnake();
    let bodyColor = this.state.snake.dead ? "red" : "#28a745";
    this.svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => d.x * res)
      .attr("y", d => d.y * res)
      .attr("width", res)
      .attr("height", res)
      .style("stroke", "#d4edda")
      .style("stroke-width", 1)
      .attr("fill", bodyColor);
  }

  render() {
    const text = `Food: x: ${this.state.food.x}  y:  ${this.state.food.y}\n
    Head: x: ${this.state.snake.head.x}  y:  ${this.state.snake.head.y}\n`;
    return (
      <>
        <div id="board" style={{ width: "100%", height: "100%" }} />
        <div className="alert alert-success fade show" role="alert">
          {text}
        </div>
      </>
    );
  }
}

export default Game;
