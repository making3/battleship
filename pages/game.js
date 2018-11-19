import React from 'react';
import {withRouter} from 'next/router'

class Game extends React.Component {
  render(props) {
    return (
      <div>
        <p>Game ID {this.props.router.query.gameId}</p>
      </div>
    );
  }
}

export default withRouter(Game);
