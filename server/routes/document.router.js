const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// how to set up multer router for file uploading?

// tia help pls

router.get('/', (req, res) => { // GET ALL DOCUMENT NAMES AND FILEPATHS FROM DATABASE
  pool.query(`
    SELECT * FROM "document" ORDER BY "id" ASC;
  `)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.post('/', (req, res) => { // ADD NEW DOCUMENT
  pool.query(`
    INSERT INTO "document" ("name", "file") VALUES ($1, $2)
    RETURNING "id";
  `, [req.body.name, req.body.filePath])
    .then(dbRes => {
      console.log('---- Added new document into database row : ', dbRes.rows);
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.delete('/', (req, res) => { // DELETE DOCUMENT VIA ID
  pool.query(`
    DELETE FROM "document" WHERE "id" = $1;
  `, [req.body.id])
    .then(dbRes => {
      console.log('---- Deleted document from row : ', req.body.id);
      res.sendStatus(200);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
})

module.exports = router;
