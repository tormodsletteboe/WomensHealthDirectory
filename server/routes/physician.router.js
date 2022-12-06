const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  pool.query(`
    SELECT * FROM "physician" ORDER BY "id" ASC;
  `)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => {
  pool.query(`
    INSERT INTO "physician" ("name", "email") VALUES ($1, $2)
    RETURNING "id";
  `, [req.body.name, req.body.email])
    .then(dbRes => {
      console.log('---- Added new physician row : ', dbRes.rows);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.put('/', (req, res) => {
  pool.query(`
    UPDATE "physician" SET "name" = $1, "email" = $2 WHERE "id" = $3;
  `, [req.body.name, req.body.email, req.body.id])
    .then(dbRes => {
      console.log('---- Updated physician row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

router.delete('/', (req, res) => {
  pool.query(`
    DELETE FROM "physician" WHERE "id" = $1;
  `, [req.body.id])
    .then(dbRes => {
      console.log('---- Deleted physician row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;
