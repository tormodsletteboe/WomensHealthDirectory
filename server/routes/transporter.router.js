const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const transporter = require('../modules/transporter');

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  const htmlToSend = req.body.htmlToSend;
  const emailList = req.body.emailList;

  console.log('email list is:', req.body);
  const options = {
      from: '"vifiexample01@gmail.com" <vifiexample01@gmail.com>', // sender address
      to: emailList, // list of receivers
      subject: "Vifi Newsletter", // Subject line
      text: "Vifi Newsletter", // plain text body
      html: htmlToSend, // html body
  }

  transporter.sendMail(options, function (err, info) {
    if(err){
        console.log(err);
        return;
    }
    sendStatus(204)
    console.log("sent", info.response);
  })
  // .then(res => {sendStatus(204)})
  // .catch(error => {
  //   console.error(error);
  //   res.sendStatus(500);
  // })
});

module.exports = router;
