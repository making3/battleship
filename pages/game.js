import React from 'react';
import {withRouter} from 'next/router'

class Game extends React.Component {
  render() {
    return (
      <div>
        Have a friend join the game by visiting the following URL (works only once!):
        <pre>http://localhost:3000/games/join/{this.props.router.query.gameId}</pre>
      </div>
    );
  }
}

export default withRouter(Game);
