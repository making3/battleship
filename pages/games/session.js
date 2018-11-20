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
      </div>
    );
  }
}

export default withRouter(GameSession);
