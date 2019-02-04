import React from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

class Viewer extends React.Component {
  static propTypes = {
    boardType: PropTypes.oneOf(['opponent', 'viewer']).isRequired,
    gameId: PropTypes.string.isRequired,
    initialBoard: PropTypes.array.isRequired,
    sessionId: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      board: props.initialBoard,
    };
  }

  render() {
    const { board } = this.state;

    return (
      <Board board={board} {...this.props} />
    );
  }
}

export default Viewer;
