const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => { // GET ALL FEEDBACK: RATINGS + COMMENTS
  pool.query(`
    SELECT * FROM "feedback" ORDER BY "id" ASC;
  `)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.get('/avg', (req, res) => { // GET AVERAGE OF ALL RATINGS
  pool.query(`
    SELECT AVG("rating") as average_rating FROM "feedback";
  `)
    .then(dbRes => {
      res.send(dbRes.rows[0].average_rating);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

router.post('/', (req, res) => { // ADD NEW FEEDBACK
  pool.query(`
    INSERT INTO "feedback" ("rating", "comment", "user_id") VALUES ($1, $2, $3)
    RETURNING "id";
  `, [req.body.rating, req.body.comment, req.body.user_id])
    .then(dbRes => {
      console.log('---- Added new feedback row : ', dbRes.rows);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.delete('/', (req, res) => { // DELETE FEEDBACK
  pool.query(`
    DELETE FROM "feedback" WHERE "id" = $1;
  `, [req.body.id])
    .then(dbRes => {
      console.log('---- Deleted feedback row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;
