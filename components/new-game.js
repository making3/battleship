import React from 'react';
import css from '../styles/new-game.scss';
import Link from 'next/link';

export default class NewGame extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('test', this);
  }
  render() {
    return (
      <div className={css.createGame}>
        <button className={css.newGame} onClick={this.handleClick}>New Game</button>
      </div>
    );
  }
}
