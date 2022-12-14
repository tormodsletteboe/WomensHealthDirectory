const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//GET router to fetch health categories database
router.get('/', rejectUnauthenticated, function (req, res) {
    console.log('in /preventativecare GET router');

    let sqlText = `SELECT * FROM "health_category";`;
   
    pool.query(sqlText)
   
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      console.log(error);
      res.sendStatus(500);
    })
});

router.get('/:catId/ages/:ageId', async (req, res) => {
    console.log('in preventativecare id router');

    let catId = [req.params.catId];
    console.log('catId is', catId);

    let ageId = [req.params.ageId];
    console.log('ageId is', ageId);

    let faqSQLText = `
    SELECT ("question"), ("answer") FROM "faq"
    WHERE "health_category_id" = $1 AND "age_range_id"=$2;`;

    // Get FAQs
    try{

    let faqRes = await pool.query(faqSQLText, [req.params.catId, req.params.ageId]);
    console.log('faqRes is', faqRes);

    let apiRes = {
        faqs: faqRes.rows
    }
    res.send(apiRes);

    }catch (err) {
        console.log('Error with fetching FAQ', err);
        res.sendStatus(500);
    }

    //Get Diagnostic Tools
    // let diagRes= await pool.query(`
    // SELECT ("question", "answer") FROM "faq"
    // WHERE "health_category_id" = $1 AND "age_range_id"=$2;`);
    // let drQuestionRes = await pool.query(`SELECT * FROM dr_qs WHERE ...`);
    // etc.....

})

module.exports = router;

