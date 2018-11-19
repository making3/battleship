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
    const { data, status, statusText } = await axios.get('/api/games/new');
    // TODO: Test if statusText is the correct piece to display.
    if (status !== 200) {
      this.setState({
        error: statusText
      });
      return;
    }
    Router.push(`/games/${data.id}`);
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
