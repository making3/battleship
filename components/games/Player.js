import React from 'react';
import PropTypes from 'prop-types';
import Point from './Point';
import GameLayout from './GameLayout';
import Board from './Board';

class Player extends React.Component {
  static propTypes = {
    gameId: PropTypes.string.isRequired,
    initialBoard: PropTypes.array.isRequired,
    sessionId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      board: props.initialBoard
    };
  }

  render() {
    const { board } = this.state;
    const { gameId, sessionId } = this.props;

    return (
      <Board board={board} boardType="player" {...this.props} />
    );
  }
}

export default Player;
