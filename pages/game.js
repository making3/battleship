import axios from 'axios';
import React from 'react';
import {withRouter} from 'next/router';
import { GameLayout, Player, Viewer, Layout } from '../components';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: null,
      sessions : [],
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

  renderPlayer = ({ board, sessionId }) => {
    return <Player initialBoard={board} key={sessionId} {...this.props.router.query}  />;
  };

  renderViewer = ({ board, sessionId }, hasOpponent) =>
    <Viewer boardType={hasOpponent ? 'opponent' : 'viewer'} initialBoard={board} key={sessionId} {...this.props.router.query} />;

  renderBoards = () => {
    const { hasOpponent, sessions } = this.state;
    const { gameId, sessionId } = this.props.router.query;
    return sessions.map((session) =>
      session.sessionId === sessionId
        ? this.renderPlayer(session)
        : this.renderViewer(session, hasOpponent)
    );
  };

  render() {
    const { game } = this.state;
    if (!game) {
      return <div>Loading...</div>;
    }
    return (
      <GameLayout>
        {this.renderBoards()}
      </GameLayout>
    )
  }
}

export default withRouter(Game);
