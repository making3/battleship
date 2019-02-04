import axios from 'axios';
import React from 'react';
import {withRouter} from 'next/router';
import { GameLayout, Player, Viewer, Layout } from '../components';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
    }
  }

  async componentDidMount() {
    try {
      const { gameId, sessionId } = this.props.router.query;
      const { data } = await axios.get(`/api/games/${gameId}?sessionId=${sessionId}`);
      this.setState(() => data);
    } catch (e) {
      console.log('e: ', e);
      this.setState(() => ({ error: e.response ? e.response.data : (e.response || e) }));
    }
  }

  renderPlayer = () => {
    const { game, session } = this.state;
    return <Player initialBoard={game[session.boardIndex].board} {...this.props.router.query}  />;
  };

  renderViewer = (board, boardType) =>
    <Viewer boardType={boardType} initialBoard={board} {...this.props.router.query} />;

  renderGameAsViewer = () => {
    const { game } = this.state;
    return (
      <GameLayout>
        {this.renderViewer(game[0].board, 'viewer')}
        {game.length > 1 ? this.renderViewer(game[1].board, 'viewer') : 'Player 2 not playing yet'}
      </GameLayout>
    );
  }

  renderGameAsPlayer = () => {
    const { game, session } = this.state;
    const { board } = session.boardIndex === 1 ? game[0] : game[1];

    return (
      <GameLayout>
        {this.renderPlayer()}
        {this.renderViewer(board, 'opponent')}
      </GameLayout>
    );
  };

  render() {
    const { game, session } = this.state;
    if (!game) {
      return <div>Loading...</div>;
    }
    if (session) {
      return this.renderGameAsPlayer();
    }
    return this.renderGameAsViewer();
  }
}

export default withRouter(Game);
