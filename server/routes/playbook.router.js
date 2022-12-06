const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:age/:category', (req, res) => { // GET ALL QUESTIONS FROM DATABASE
  pool.query(`
    SELECT "id", "question" FROM "playbook" WHERE "age_range_id" = $1 && "category_id" == $2;
  `, [req.params.age, req.params.category])
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => { // ADD NEW QUESTION INTO DATABASE
  pool.query(`
    INSERT INTO "playbook" ("question", "age_range_id", "category_id")
    VALUES ($1, $2, $3)
    RETURNING "id"
  `, [req.body.question, req.body.age_range, req.body.category])
    .then(dbRes => {
      console.log('---- Added new row into "playbook" table ----', dbRes.rows);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.put('/', (req, res) => { // UPDATE QUESTION INFORMATION
  pool.query(`
    UPDATE "playbook" SET "question" = $1, "age_range_id" = $2, "category_id" = $3 WHERE "id" = $4;
  `, [req.body.question, req.body.age_range, req.body.category, req.body.id])
    .then(dbRes => {
      console.log('---- Updated in playbook table row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

router.delete('/', (req, res) => { // DELETE QUESTION INFO
  pool.query(`
    DELETE FROM "playbook" WHERE "id" = $1;
  `, [req.body.id])
    .then(dbRes => {
      console.log('---- Deleted playbook row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;
