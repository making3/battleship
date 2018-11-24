import React from 'react';
import Layout from '../components/layout';
import NewGame from '../components/new-game';

export default class extends React.Component {
  render() {
    return (
      <Layout>
        <div>
          <p>Welcome to Battleship!</p>
          <NewGame />
        </div>
      </Layout>
    );
  }
}
