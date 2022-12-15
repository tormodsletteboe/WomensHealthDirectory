
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:categoryId', (req, res) => {

  const categoryId = req.params.categoryId;
  // const ageRangeId = req.params.ageRangeId;

  console.log('in get request for specific resources, id', categoryId);

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
      console.log(error);
      res.sendStatus(500);
    })
});

router.post('/:categoryId', (req, res) => {

  const categoryId = req.params.categoryId;

  const sqlText = `
    INSERT INTO "resources" ("name", "link", "description", "health_category_id")
    VALUES ($1 , $2 , $3, $4 )
    ;
    `;

  const sqlParams = [req.body.name, req.body.link, req.body.description, categoryId];
  
  console.log('sql params are', sqlParams);

  pool.query(sqlText, sqlParams)
  .then(dbRes => {
    res.sendStatus(201);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  })
});

router.put('/:categoryId', (req, res) => {

  const categoryId = req.params.categoryId;

  const sqlText = `
    UPDATE "resources"
    SET "name" = $1 , "link" = $2 , "description" = $3 
    WHERE "id" = $4 AND "health_category_id" = $5
    ;
    `;

  const sqlParams = [req.body.name, req.body.link, req.body.description, req.body.id, categoryId];
  
  console.log('sql params are', sqlParams);

  pool.query(sqlText, sqlParams)
  .then(dbRes => {
    res.sendStatus(204);
  })
  .catch(error => {
    console.log(error);
    res.sendStatus(500);
  })
});

router.delete('/:categoryId', (req, res) => {

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
    console.log(error);
    res.sendStatus(500);
  })
});

module.exports = router;
