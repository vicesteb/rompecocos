import React from 'react';
import Square from './square';

class Board extends React.Component {

  constructor() {
    super();
    
    var i = 0;

    this.state = {
      squares:  Array(4).fill(Array(4)).map((row) => {
        return row.fill(0).map((element) => {
          return i++;
        })  
      })
    }
  }

  handleClick(i) {
    alert('Clicked on square ' + i);
  }

  renderSquare(i) {
    return <Square value={i} onClick={() => this.handleClick(i)}/>;
  }

  renderSquaresRow(squareRow) {
    return (
      <div className="board-row">
        { squareRow.map(this.renderSquare, this) }
      </div>
    );
  }

  renderSquares() {
    return this.state.squares.map(this.renderSquaresRow, this);
  }

  render() {
    return (
      <div>
        { this.renderSquares() }
      </div>
    );
  }
}

module.exports = Board;