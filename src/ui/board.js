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

  handleClick(rowIndex, squareIndex) {
    alert('Clicked on (' + rowIndex + ', ' + squareIndex + ') with value ' + this.state.squares[rowIndex][squareIndex]);
  }

  renderSquare(rowIndex, squareIndex, squareValue) {
    return <Square value={squareValue} onClick={() => this.handleClick(rowIndex, squareIndex)}/>;
  }

  renderSquaresRow(squareRow, rowIndex) {
    return (
      <div className="board-row">
        { squareRow.map((value, squareIndex) => { return this.renderSquare(rowIndex, squareIndex, value)}, this) }
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