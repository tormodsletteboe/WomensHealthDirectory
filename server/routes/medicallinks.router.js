const express = require('express');
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");
const pool  = require('../modules/pool');
const router = express.Router();


//send back all medical links
router.get('/',rejectUnauthenticated,(req,res)=>{

    const sqlText =`
        SELECT * FROM "medical_links";
    `;
   
    pool.query(sqlText)
    .then(dbRes =>{
        res.send(dbRes.rows);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    });

});

module.exports = router;