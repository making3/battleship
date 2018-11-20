import axios from 'axios';
import React from 'react';
import {withRouter} from 'next/router'

class GameSession extends React.Component {
  state = {
    error: null,
    board: null
  }
  async componentDidMount() {
    try {
      const sessionId = this.props.router.query.sessionId;
      const { data } = await axios.get(`/api/games/sessions/${sessionId}`);

      this.setState({
        board: data
      });
    } catch (e) {
      this.setState({
        error: e.response.data
      });
    }
  }
  render() {
    if (this.state.error) {
      return (
        <div>{this.state.error}</div>
      )
    }
    return (
      <div>
        <pre>Session ID {this.props.router.query.sessionId}</pre>

        {this.props.router.query.gameId &&
          <div>
            Have a friend join the game by visiting the following URL (works only once!):
            <pre>http://localhost:3000/games/join/{this.props.router.query.gameId}</pre>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(GameSession);
