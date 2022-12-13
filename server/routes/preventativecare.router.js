const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//POST router to send age  and retrieve health categories database
router.post('/', rejectUnauthenticated, function (req, res) {
    console.log('in /preventativecare POST router');
    console.log('req.body.data is', req.body.data);

    
    let age = req.body.data.age;
    console.log('age is', age);

    let sqlText= `SELECT * FROM "health_category";`;

    let sqlParams = [age];

    pool.query(sqlText, sqlParams)
    .then((result) => {
        res.status(200).send(result.rows);

    })
    .catch((err) => {
        console.log('in preventativecare POST router error, error is', err);
    })

});

module.exports = router;

