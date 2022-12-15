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

router.put('/:medlinkId',rejectUnauthenticated,(req,res)=>{

    const medlinkId = req.params.medlinkId;
    const sqlText =`
    UPDATE "medical_links"
    SET "name" = $1, "link"=$2, "logo_url"=$3
    WHERE "id" = $4
    ;
    `;

    
    const sqlParams = [req.body.name,req.body.link,req.body.logo_url, medlinkId];
    pool.query(sqlText,sqlParams)
    .then(dbRes =>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    });

});

module.exports = router;