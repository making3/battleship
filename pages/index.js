import React from 'react';
import NewGame from '../components/new-game';

export default class extends React.Component {
  render() {
    return (
      <div>
        <p>Welcome to Battleship!</p>
        <NewGame />
      </div>
    );
  }
}
