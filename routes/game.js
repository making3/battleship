const express = require('express');
const random = require('../lib/random');

const games = new Map();

module.exports = () => {
  const router = express.Router();

  router.get('/new', (req, res) => {
    const game = getNewGame();
    res.send(game);
  });

  router.get('/:id', (req, res) => {
    const game = games.get(req.params.id);

    if (!game) {
      res.status(404).send('Game not found!');
    }

    // TODO: Player specific pages
    res.send(game);
  });

  return router;
};

function getNewGameId() {
  const id = random.getId();
  if (games.has(id)) {
    return getNewGameId(); // Try again
  }
  return id;
}

function getNewGame() {
  const newGameId = getNewGameId();

  const game = {
    id: newGameId
    // TODO: Game stuff
  };

  games.set(newGameId, game);

  return game;
}
