const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  // GET route code here
});

router.post('/', (req, res) => {
  pool.query(`
    INSERT INTO "newsletter" ("email")
    VALUES ($1)
  `, [req.body.email])
    .then(dbRes => {
      console.log('---- Added new email to newsletter table');
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Unable to add new email to newsletter table', err);
      res.sendStatus(500);
    })
});

module.exports = router;
