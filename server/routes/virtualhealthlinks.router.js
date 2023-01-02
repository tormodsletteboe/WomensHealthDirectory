const express = require('express');
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");
const pool  = require('../modules/pool');
const router = express.Router();


//send back all virtual links
router.get('/',rejectUnauthenticated,(req,res)=>{

    const sqlText =`
        SELECT * FROM "virtualhealth" ORDER BY "id" DESC;
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

//update specific virtual health link
router.put('/:virtualhealthlinkId',rejectUnauthenticated,(req,res)=>{

    const virtualhealthlinkId = req.params.virtualhealthlinkId;
    const sqlText =`
    UPDATE "virtualhealth"
    SET "name" = $1,"info_cost"=$2, "link"=$3,"specialty"=$4, "logo_url"=$5, "description"=$6
    WHERE "id" = $7
    ;
    `;

    
    const sqlParams = [req.body.name,req.body.info_cost,req.body.link,req.body.specialty,req.body.logo_url,req.body.description, virtualhealthlinkId];
    pool.query(sqlText,sqlParams)
    .then(dbRes =>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    });

});

//delete specific virtual health link
router.delete('/:virtualhealthlinkId',rejectUnauthenticated,(req,res)=>{

    const virtualhealthlinkId = req.params.virtualhealthlinkId;
    const sqlText =`
    DELETE FROM "virtualhealth"
    WHERE "id" = $1
    ;
    `;

    
    const sqlParams = [virtualhealthlinkId];
    pool.query(sqlText,sqlParams)
    .then(dbRes =>{
        res.sendStatus(200);
    })
    .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
    });

});

//add virtual health link
router.post('/',rejectUnauthenticated,(req,res)=>{

   
    const sqlText =`
    INSERT INTO "virtualhealth" ("name","info_cost","link","specialty","logo_url","description")
    VALUES($1,$2,$3,$4,$5,$6)
    ;
    `;

    const sqlParams = [req.body.name,req.body.info_cost,req.body.link,req.body.specialty,req.body.logo_url,req.body.description];
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