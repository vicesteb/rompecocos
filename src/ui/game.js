import React from 'react';
import Board from './board'

class Game extends React.Component {
  constructor() {
    super();
    
    var i = 0;

    this.state = {
      history: [{
        squares: Array(4).fill(Array(4)).map((row) => {
          return row.fill(0).map((element) => {
            return i++;
          })
        })
      }],
      stepNumber: 0,
      emptySquare: {
          rowIndex: 0,
          squareIndex: 0
      }
    }
  }


  clickedOnEmptySquare(rowIndex, squareIndex) {
    return this.state.emptySquare.rowIndex === rowIndex && this.state.emptySquare.squareIndex === squareIndex;
  }

  isUpperSquareEmpty(rowIndex, squareIndex) {
    return this.state.emptySquare.rowIndex === rowIndex -1 && this.state.emptySquare.squareIndex === squareIndex;
  }

  isLeftSquareEmpty(rowIndex, squareIndex) {
    return this.state.emptySquare.rowIndex === rowIndex && this.state.emptySquare.squareIndex === squareIndex - 1;
  }

  isBottomSquareEmpty(rowIndex, squareIndex) {
    return this.state.emptySquare.rowIndex === rowIndex + 1 && this.state.emptySquare.squareIndex === squareIndex;
  }

  isRightSquareEmpty(rowIndex, squareIndex) {
    return this.state.emptySquare.rowIndex === rowIndex && this.state.emptySquare.squareIndex === squareIndex + 1;
  }

  clickedOnMovableSquare(rowIndex, squareIndex) {
    return (this.isUpperSquareEmpty(rowIndex, squareIndex)
              || this.isLeftSquareEmpty(rowIndex, squareIndex)
                || this.isBottomSquareEmpty(rowIndex, squareIndex)
                  || this.isRightSquareEmpty(rowIndex, squareIndex)) 
  }

  swapWithEmptySquare(rowIndex, squareIndex) {
    //alert ('Swap them!');
    
    this.setState(function(prevState, props) {
      const history = prevState.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1];
      const emptySquare = prevState.emptySquare;

      const squares = current.squares.map((row) => row.slice());

      var newEmptySquare = {
        rowIndex: rowIndex,
        squareIndex: squareIndex
      }

      squares[emptySquare.rowIndex][emptySquare.squareIndex] = squares[rowIndex][squareIndex];
      squares[rowIndex][squareIndex] = 0;

      return {
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        emptySquare: newEmptySquare
      }
    });
  }

  handleClick(rowIndex, squareIndex) {
    // alert('Clicked on [' + rowIndex + ', ' + squareIndex + ']');
    if(!this.clickedOnEmptySquare(rowIndex, squareIndex)
        && this.clickedOnMovableSquare(rowIndex, squareIndex)) {
          this.swapWithEmptySquare(rowIndex, squareIndex);
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ?
        'Move #' + move :
        'Game start';
      return (
        <li>
          <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(rowIndex, squareIndex) => this.handleClick(rowIndex, squareIndex)} squares={current.squares}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

module.exports = Game;