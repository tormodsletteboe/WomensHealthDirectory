//router for medical links page in admin view

const express = require('express');
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");
const pool  = require('../modules/pool');
const router = express.Router();


//send back all medical links
router.get('/',rejectUnauthenticated,(req,res)=>{

    const sqlText =`
        SELECT * FROM "medical_links" ORDER BY "id" DESC;
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


//update a specific medical link
router.put('/:medlinkId',rejectUnauthenticated,(req,res)=>{

    const medlinkId = req.params.medlinkId;
    const sqlText =`
    UPDATE "medical_links"
    SET "name" = $1, "link"=$2, "logo_url"=$3, "description"=$4
    WHERE "id" = $5
    ;
    `;

    
    const sqlParams = [req.body.name,req.body.link,req.body.logo_url,req.body.description, medlinkId];
    pool.query(sqlText,sqlParams)
    .then(dbRes =>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    });

});

//delete a specific medical link
router.delete('/:medlinkId',rejectUnauthenticated,(req,res)=>{

    const medlinkId = req.params.medlinkId;
    const sqlText =`
    DELETE FROM "medical_links"
    WHERE "id" = $1
    ;
    `;

    
    const sqlParams = [medlinkId];
    pool.query(sqlText,sqlParams)
    .then(dbRes =>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    });

});
//add a new medical link
router.post('/',rejectUnauthenticated,(req,res)=>{

   
    const sqlText =`
    INSERT INTO "medical_links" ("name","link","logo_url","description")
    VALUES($1,$2,$3,$4)
    ;
    `;

    const sqlParams = [req.body.name,req.body.link,req.body.logo_url,req.body.description];
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