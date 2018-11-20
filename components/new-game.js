import React from 'react';
import css from '../styles/new-game.scss';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router'

export default class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick() {
    try {
      const { data } = await axios.get('/api/games/new');
      Router.push(`/games/sessions/${data.sessionId}?gameId=${data.gameId}`);
    } catch (e) {
      this.setState({
        error: statusText
      });
    }
  }
  render() {
    // TODO: In-line error
    if (this.state.error) {
      return (
        <div>Error! {this.state.error}</div>
      );
    }

    return (
      <div className={css.createGame}>
        <button className={css.newGame} onClick={this.handleClick}>New Game</button>
      </div>
    );
  }
}
