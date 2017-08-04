import React from 'react';
import Square from './square';

class Board extends React.Component {

  renderSquare(rowIndex, squareIndex, squareValue) {
    return <Square key={rowIndex + squareIndex } value={squareValue} onClick={() => this.props.onClick(rowIndex, squareIndex)}/>;
  }

  renderSquaresRow(squareRow, rowIndex) {
    return (
      <div className="board-row" key={squareRow + rowIndex}>
        { squareRow.map((value, squareIndex) => { return this.renderSquare(rowIndex, squareIndex, value)}, this) }
      </div>
    );
  }

  renderSquares() {
    return this.props.squares.map(this.renderSquaresRow, this);
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