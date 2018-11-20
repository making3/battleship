import axios from 'axios';
import React from 'react';
import {withRouter} from 'next/router'
import Router from 'next/router'

class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick() {
    try {
      const gameId = this.props.router.query.gameId;
      const { data } = await axios.get(`/api/games/join/${gameId}`);
      Router.push(`/games/sessions/${data.id}`);
    } catch (e) {
      this.setState({
        error: e.response.data
      });
    }
  }
  render() {
    if (this.state.error) {
      return (
        <div>
          Error! {this.state.error}
        </div>
      )
    }

    return (
      <div>
        <div>
          You have been invited to join a game!
        </div>
        <button onClick={this.handleClick}>Join Game Now</button>
      </div>
    );
  }
}

export default withRouter(JoinGame);
