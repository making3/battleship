import React from 'react';
import './styles/GameLayout.scss';

class GameLayout extends React.Component {
  render() {
    return (
      <div className="game">
        {this.props.children}
      </div>
    )
  }
}

export default GameLayout;
