const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//GET router to fetch FAQs, diagnostic tools, resources, and guidelines from database
//Todo: figure out how to pass in age range and/or specific age
//(compare user age to age range)
router.get('/:id/', rejectUnauthenticated, function (req, res) {
    console.log('in /faq GET router');

    let sqlText = `SELECT ("question", "answer") FROM "faq"
    WHERE "health_category_id" = $1 AND "age_range_id"=$2;`;
   
    pool.query(sqlText)
   
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});