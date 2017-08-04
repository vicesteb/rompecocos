import React from 'react';
import Board from './board'

class Game extends React.Component {
  constructor() {
    super();
    
    var i = 0;

    this.state = {
      squares:  Array(4).fill(Array(4)).map((row) => {
          return row.fill(0).map((element) => {
            return i++;
          })
      }),
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
    this.setState(function(prevState, props) {
        var newEmptySquare = {
          rowIndex: rowIndex,
          squareIndex: squareIndex
        }
        prevState.squares[prevState.emptySquare.rowIndex][prevState.emptySquare.squareIndex] = prevState.squares[rowIndex][squareIndex];
        prevState.squares[rowIndex][squareIndex] = 0;

        return {
          squares : prevState.squares,
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

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={(rowIndex, squareIndex) => this.handleClick(rowIndex, squareIndex)} squares={this.state.squares}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

module.exports = Game;