const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route will get all emails from database
router.get('/', (req, res) => {
  pool.query(`SELECT * from "newsletter"
  ORDER BY "id" ASC
    `)
  .then(dbRes => {
    res.send(dbRes.rows);
  })
  .catch(err => {
    console.error('Error in getting email table', err);
    res.sendStatus(500);
  })
});


// POST route to add email to database when user signs up
router.post('/', (req, res) => {
  pool.query(`
    INSERT INTO "newsletter" ("email")
    VALUES ($1);
  `, [req.body.email])
    .then(dbRes => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error('Error adding email', err);
      res.sendStatus(500);
    })
});

module.exports = router;
