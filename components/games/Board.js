import React from 'react';
import PropTypes from 'prop-types';
import Point from './Point';
import './styles/Board.scss';

const baseClass = 'board';

class Board extends React.Component {
  static propTypes = {
    board: PropTypes.array,
    boardType: PropTypes.oneOf(['viewer', 'opponent', 'player']).isRequired,
    gameId: PropTypes.string.isRequired,
    sessionId: PropTypes.string,
  };

  renderPoints = (row, x) => {
    return row.map((point, y) => {
      return (
        <Point
          boardType={this.props.boardType}
          gameId={this.props.gameId}
          hasShip={point.hasShip}
          shot={point.shot}
          key={`${x}-${y}`}
          sessionId={this.props.sessionId}
          x={x}
          y={y}
        />
      );
    });
  }

  render() {
    const { board, boardType } = this.props;
    if (!board) {
      return <div className="board-loading">Still loading...</div>;
    }

    const points = board.map((row, x) => this.renderPoints(row, x)).flat();

    const headerClassName = `${baseClass}-header`;

    return (
      <div>
        <h2 className={headerClassName}>
          {capitalizeFirstLetter(boardType)}
        </h2>
        <div className={baseClass}>
          {points}
        </div>
      </div>
    );
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Board;
