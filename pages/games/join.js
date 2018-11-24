import axios from 'axios';
import React from 'react';
import {withRouter} from 'next/router';
import Router from 'next/router';
import Layout from '../../components/layout';

class JoinGame extends React.Component {
  state = {
    error: null
  }
  async componentDidMount() {
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
    return (
      <Layout>
        {this.state.error ? (
          <div>{this.state.error}</div>
        ) : (
          <p>Joining game..</p>
        )}
      </Layout>
    );
  }
}

export default withRouter(JoinGame);
