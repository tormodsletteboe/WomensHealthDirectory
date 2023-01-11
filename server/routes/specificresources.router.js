
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");


// GET router to get all resources for the selected health category
router.get('/:categoryId', rejectUnauthenticated, (req, res) => {

  const categoryId = req.params.categoryId;

  const sqlText = 
  `
    SELECT "id", "name", "link", "description" FROM "resources" 
    WHERE "health_category_id" = $1
    ORDER BY "id" ASC
    ;
  `;

  const sqlParams = [categoryId];

  pool.query(sqlText, sqlParams)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    })
});

// POST router to add a resource for the selected health category
router.post('/:categoryId', rejectUnauthenticated, (req, res) => {

  const categoryId = req.params.categoryId;

  const sqlText = `
    INSERT INTO "resources" ("name", "link", "description", "health_category_id")
    VALUES ($1 , $2 , $3, $4 )
    ;
    `;

  const sqlParams = [req.body.name, req.body.link, req.body.description, categoryId];

  pool.query(sqlText, sqlParams)
  .then(dbRes => {
    res.sendStatus(201);
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500);
  })
});

// PUT router to edit a resource for the selected health category
router.put('/:categoryId', rejectUnauthenticated, (req, res) => {

  const categoryId = req.params.categoryId;

  const sqlText = `
    UPDATE "resources"
    SET "name" = $1 , "link" = $2 , "description" = $3 
    WHERE "id" = $4 AND "health_category_id" = $5
    ;
    `;

  const sqlParams = [req.body.name, req.body.link, req.body.description, req.body.id, categoryId];

  pool.query(sqlText, sqlParams)
  .then(dbRes => {
    res.sendStatus(204);
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500);
  })
});

// DELETE router to edit a resource for the selected health category
router.delete('/:categoryId', rejectUnauthenticated, (req, res) => {
  const categoryId = req.body.categoryId;

  const sqlText = `
    DELETE FROM "resources"
    WHERE "id" = $1
    ;
    `;

  const sqlParams = [req.body.id];

  pool.query(sqlText, sqlParams)
  .then(dbRes => {
    res.sendStatus(204);
  })
  .catch(error => {
    console.error(error);
    res.sendStatus(500);
  })
});

module.exports = router;
