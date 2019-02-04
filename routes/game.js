const express = require('express');
const random = require('../lib/random');

const games = new Map();

// Temporary debugging code!
createTemporaryGame();

module.exports = () => {
  const router = express.Router();

  router.get('/new', (req, res) => {
    const { id, game } = getNewGame();
    res.send({
      gameId: id,
      sessionId: game[0].sessionId
    });
  });

  router.get('/join/:gameId', (req, res) => {
    let game = games.get(req.params.gameId);

    if (!game) {
      res.status(404).send('Game not found!');
      return;
    }

    if (game.length > 1) {
      res.status(400).send('Game already has two players!');
      return;
    }

    game = addPlayerTwo(req.params.gameId);

    res.send({ id: game[1].sessionId });
  });

  router.get('/:gameId', (req, res) => {
    const game = games.get(req.params.gameId);
    if (!game) {
      return res.status(404).send('Game not found!');
    }
    const sessions = getViewSessions(game.sessions, req.query.sessionId);
    res.send({
      sessions,
      game,
      hasOpponent: game.sessions.hasOwnProperty(req.query.sessionId),
    });
  });

  router.post('/:gameId/attack', (req, res) => {
    const { gameId } = req.params;
    const { x, y, sessionId } = req.body;
    const game = games.get(gameId);
    if (!game) {
      return res.status(404).send('Game not found!');
    }

    const opponentKey = Object.keys(game.sessions).find((key) => key !== sessionId);

    const opponentBoard = game.sessions[opponentKey];
    opponentBoard[x][y] = {
      hasShip: false,
      shot: true,
    };
    game.sessions[opponentKey] = opponentBoard;
    games.set(gameId, game);
  });

  return router;
};

function getViewSessions(sessions, sessionId) {
  return Object.keys(sessions).map((sessionKey) => ({
      sessionId: sessionKey,
      board: sessionKey === sessionId ? sessions[sessionKey] : stripShipStatsFromSessions(sessions[sessionKey])
  }));
}

function stripShipStatsFromSessions(session) {
  // TODO: Remove hasShip from session board...
  session.map((row) =>
    row.map(({ shot }) => ({ shot }))
  );
  return session;
}

function addNewGame(id=getNewGameId()) {
  const game = {
    active: true,
    sessions: {
      [random.getId()]: getNewBoard(),
    },
  };
  games.set(id, game);
  return { id, game };
}

function addPlayerTwo(gameId) {
  const game = games.get(gameId);
  if (!game) {
    return game;
  }
  game.sessions[random.getId()] = getNewBoard();
  return game;
}

function getNewGameId() {
  const id = random.getId();
  if (games.has(id)) {
    return getNewGameId(); // Try again
  }
  return id;
}

function getNewBoard(boardSize = 10) {
  const defaultPoint = {
    hasShip: false,
    shot: false
  };
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let k = 0; k < boardSize; k++) {
      row.push({
        hasShip: false,
        shot: false,
      });
    }
    board.push(row);
  }
  return board;
}

function createTemporaryGame() {
  const gameId = 'example';
  const game = {
    active: true,
    sessions: {
      1: getNewBoard(),
      2: getNewBoard(),
    }
  };
  games.set(gameId, game);
}
