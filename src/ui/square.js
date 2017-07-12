import React from 'react';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => {this.props.onClick()} }>
        {
          (this.props.value === 0) ? ' ' : this.props.value
        }
      </button>
    );
  }
}

module.exports = Square;