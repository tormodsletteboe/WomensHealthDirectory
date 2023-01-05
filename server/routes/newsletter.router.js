const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// gets all email from database
router.get('/', (req, res) => {
  pool.query(`SELECT * from "newsletter"
  ORDER BY "id" ASC
    `)
  .then(dbRes => {
    res.send(dbRes.rows);
  })
  .catch(err => {
    console.error('Unable to get email table', err);
    res.sendStatus(500);
  })
});

router.post('/', (req, res) => {
  pool.query(`
    INSERT INTO "newsletter" ("email")
    VALUES ($1);
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
