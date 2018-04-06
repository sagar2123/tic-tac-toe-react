import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    constructor(props){
        super(props);
    }
  render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props){
    super()
  }
  

  renderSquare(i) {
    return <Square alternativeMove={this.props.alternativeMove} value={this.props.value} onClick={() => this.props.handleClick(i)}/>;
  }

  render() {
    return (
      <div>
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


class Game extends React.Component {constructor(props) {
    super(props);
    this.state = {
        alternativeMove: false,
        squares: Array(9).fill(null),
        history : [
        {
          squares: [
            null, null, null,
            null, null, null,
            null, null, null,
          ]
        },
        {
          squares: [
            null, null, null,
            null, 'X', null,
            null, null, null,
          ]
        }
       ]
    };
    this.toggleState =  this.toggleState.bind(this);
    this.handleClick =  this.handleClick.bind(this);
  }

   handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if(this.state.alternativeMove){
      squares[i] = 'X';
    }else {
      squares[i] = 'O';
    }
    this.setState({squares: squares});
    this.toggleState();
  } 

  toggleState() {
    this.setState({alternativeMove : !this.state.alternativeMove});
  }

  render() {

    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(this.state.squares);
    
    return (
      <div className="game">
        <div className="game-board">
          <Board move={this.state.alternativeMove} squares={current.squares}  handleClick={(i) => this.handleClick(i)}/>
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

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
