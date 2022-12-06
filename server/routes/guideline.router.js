const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => { // GET ALL CARE GUIDELINES BASED ON AGE RANGE
  pool.query(`
    SELECT "id", "info" FROM "care_guideline" WHERE "age_id" = $1 ORDER BY "id" ASC;
  `, [req.params.id])
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => { // ADD NEW CARE GUIDELINE BASED ON AGE
  pool.query(`
    INSERT INTO "care_guideline" ("info", "age_id") VALUES ($1, $2)
    RETURNING "id";
  `, [req.body.info, req.body.age_range])
    .then(dbRes => {
      console.log('---- Added new guideline row : ', dbRes.rows);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.put('/', (req, res) => { // UPDATE CARE GUIDELINE VIA ID
  pool.query(`
    UPDATE "care_guideline" SET "info" = $1, "age_id" = $2 WHERE "id" = $3;
  `, [req.body.info, req.body.age_range, req.body.id])
    .then(dbRes => {
      console.log('---- Updated guideline row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

router.delete('/', (req, res) => { // DELETE CARE GUIDELINE VIA ID
  pool.query(`
    DELETE FROM "care_guideline" WHERE "id" = $1;
  `, [req.body.id])
    .then(dbRes => {
      console.log('---- Deleted guideline row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;
