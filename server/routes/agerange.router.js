
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/', (req, res) => {
  
  pool.query(`
    SELECT * FROM "age_range" ORDER BY "id" ASC;
  `)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.get('/:ageId', (req, res) => {
  const ageId = req.params.ageId;

  const sqlText = `
  SELECT * FROM "age_range" 
  WHERE "id" = $1
  ;`

  const sqlParams = [ageId];
  
  pool.query(sqlText, sqlParams)
    .then(dbRes => {
      res.send(dbRes.rows[0]);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

module.exports = router;
