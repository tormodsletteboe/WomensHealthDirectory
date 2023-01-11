const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const transporter = require('../modules/transporter');

router.post('/', (req, res) => {
  const htmlToSend = req.body.htmlToSend;
  const emailList = req.body.emailList;

  console.log('email list is:', req.body);

  // define options for the newsletter email
  const options = {
      from: '"vifiexample01@gmail.com" <vifiexample01@gmail.com>', // sender address
      bcc: emailList, // list of receivers
      subject: "Vifi Newsletter", // Subject line
      text: "Vifi Newsletter", // plain text body
      html: htmlToSend, // html body
  }


// transporter sends the data to the email server based on options above
  transporter.sendMail(options, function (err, info) {
    if(err){
        console.log(err);
        res.sendStatus(500).
        return;
    }
    res.sendStatus(204);
    console.log("sent", info.response);
  })
});

module.exports = router;
