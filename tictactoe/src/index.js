import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            value: ""
        }
        this.nextMove = this.nextMove.bind(this); 
    }
  nextMove() {
      if(this.props.move){
        this.setState({value : "X"});
        this.props.toggleState();
      }else{
        this.state.value = "O";
        this.setState({value : "O"});
        this.props.toggleState();
      }
  }
  render() {
    return (
      <button className="square" onClick={this.nextMove}>
        {this.state.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super()
    this.state = {
        alternativeMove: false,
    }
    this.toggleState =  this.toggleState.bind(this);
  }

  toggleState() {
    this.setState({alternativeMove : !this.state.alternativeMove});
  }

  renderSquare(i) {
    return <Square move={this.state.alternativeMove} toggleState={this.toggleState}/>;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
