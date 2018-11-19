const express = require('express');
const game = require('./game');

module.exports = () => {
  const router = express.Router();
  router.use('/games', game());
  return router;
}
