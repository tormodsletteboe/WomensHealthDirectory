
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

module.exports = router;
