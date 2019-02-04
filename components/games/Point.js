import axios from 'axios';
import React from 'react';
import PropTypes from 'prop-types';
import css from './styles/Point.scss';
import cn from 'classnames';

const baseClass = 'point';

class Point extends React.PureComponent {
  static propTypes = {
    boardType: PropTypes.oneOf(['viewer', 'opponent', 'player']).isRequired,
    gameId: PropTypes.string.isRequired,
    sessionId: PropTypes.string,
    hasShip: PropTypes.bool,
    shot: PropTypes.bool,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }

  handleClick = async () => {
    const { boardType, gameId, sessionId, x, y } = this.props;
    if (boardType !== 'opponent') {
      return;
    }

    try {
      const { data } = await axios.post(`/api/games/${gameId}/attack/`, { sessionId, x, y });
      console.log('result: ', data);
    } catch (e) {
      console.log('e: ', e);
      // TODO: Error handling!
    }
  };

  renderShot = () => {
    const { hasShip, shot } = this.props;
    const className = cn({
      [`${baseClass}-hit`]: shot && hasShip,
      [`${baseClass}-missed`]: shot && !hasShip,
    });

    return <div className={className}></div>
  }

  render() {
    const { hasShip, shot } = this.props;
    return (
      <div className={baseClass} onClick={this.handleClick}>
        {this.renderShot()}
      </div>
    );
  }
}

export default Point;
