const express = require('express');
const random = require('../lib/random');

const games = new Map();
const sessions = new Map();

module.exports = () => {
  const router = express.Router();

  router.get('/new', (req, res) => {
    const game = getNewGame();
    res.send({
      gameId: game.id,
      sessionId: game.gameCreator.id
    });
  });

  router.get('/join/:gameId', (req, res) => {
    const game = games.get(req.params.gameId);

    if (!game) {
      res.status(404).send('Game not found!');
      return;
    }

    if (game.gameCreator.opponent) {
      res.status(400).send('Game already has two players!');
      return;
    }

    const sessionId = random.getId();
    const session = {
      id: sessionId,
      board: getNewBoard(),
      opponent: game.gameCreator
    };
    sessions.set(sessionId, session);

    const gameCreatorSession = sessions.get(game.gameCreator.id);
    gameCreatorSession.opponent = session;
    sessions.set(game.gameCreator.id, gameCreatorSession);
    res.send({ id: sessionId });
  });

  router.get('/sessions/:sessionId', (req, res) => {
    const session = sessions.get(req.params.sessionId);

    if (!session) {
      res.status(404).send('Game session not found!');
      return;
    }

    res.send(session.board);
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
  const sessionId = random.getId();

  const session = {
    id: sessionId,
    board: getNewBoard()
  };
  sessions.set(sessionId, session);

  const game = {
    id: newGameId,
    gameCreator: session
  };
  games.set(newGameId, game);

  return game;
}

function getNewBoard(boardSize = 10) {
  return new Array(boardSize).fill(
    new Array(boardSize).fill({
      hasShip: false,
      hit: false
    })
  );
}
