// do not make changes to this file
const router = require('express').Router();
const jokes = require('./jokes-data');


router.get('/', async (req, res) => {
  try {
    res.status(200).json(jokes);
  } catch (error) {
    next(error)
  }

});

module.exports = router;
