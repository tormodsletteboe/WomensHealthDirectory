
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// GET route to get all age ranges
router.get('/', (req, res) => {
  
  pool.query(`
    SELECT * FROM "age_range" ORDER BY "id" ASC;
  `)
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.error(error);
      res.sendStatus(500);
    })
});

// GET route to get selected age range
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
      console.error(error);
      res.sendStatus(500);
    })
});

module.exports = router;
