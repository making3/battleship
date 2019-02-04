const express = require('express');
const random = require('../lib/random');

const games = new Map();
const sessions = new Map();

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

  router.post('/attack', (req, res) => {
    const { x, y, sessionId } = req.body;
    const session = sessions.get(sessionId);
    if (!session) {
      return res.status(404).send('Session not found!');
    }

    const game = games.get(session.gameId);
    const enemyBoard = session.boardIndex === 0 ? 1 : 0;
    const enemy = game[enemyBoard];
    enemy.board[x][y] = {
      hasShip: false,
      shot: true,
    };
    game[enemyBoard] = enemy;
    games.set(session.gameId, game);
  });

  router.get('/:gameId', (req, res) => {
    const { game, session } = getGameAndSession(req);
    if (!game) {
      res.status(404).send('Game not found!');
    }
    res.send({
      game,
      session,
    });
  });

  return router;
};

function getGameAndSession(req) {
  const { gameId } = req.params;
  const { sessionId } = req.query;
  const game = games.get(gameId);
  const session = sessions.get(sessionId);
  return {
    game,
    session
  };
}

function addNewGame(id=getNewGameId()) {
  const game = [
    {
      sessionId: random.getId(),
      board: getNewBoard(),
    }
 ];
  games.set(id, game);

  // TODO: boardIndex design is bad, need to rethink.
  sessions.set(game[0].sessionId, {
    gameId: id,
    boardIndex: 0,
  });

  return { id, game };
}

function addPlayerTwo(gameId) {
  const game = games.get(gameId);
  if (!game) {
    return game;
  }
  game.push({
    sessionId: random.getId,
    board: getNewBoard(),
  });
  games.set(gameId, game);
  sessions.set(game[0].sessionId, {
    gameId,
    boardIndex: 1
  });
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
  const game = [
    {
      sessionId: '1',
      board: getNewBoard(),
    },
    {
      sessionId: '2',
      board: getNewBoard(),
    }
 ];
  games.set(gameId, game);
  sessions.set(game[0].sessionId, {
    gameId,
    boardIndex: 0,
  });
  sessions.set(game[1].sessionId, {
    gameId,
    boardIndex: 1,
  });
}
