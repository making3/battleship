const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const routes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(bodyParser.json())

    server.use('/api', routes());

    // TODO: Refactor, repeated info over and over..
    server.get('/games/join/:id', (req, res) => {
      const actualPage = '/games/join';
      const queryParams = { gameId: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('/games/sessions/:id', (req, res) => {
      const actualPage = '/games/session';
      const queryParams = { sessionId: req.params.id, gameId: req.query.gameId };
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
