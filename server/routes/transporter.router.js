const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const transporter = require('../modules/transporter');

// POST route to send newsletter to the list of recepients in "newsletter" table
router.post('/', (req, res) => {

  const htmlToSend = req.body.htmlToSend;
  const emailList = req.body.emailList;

  // define options for the newsletter email
  const options = {
      from: `"${process.env.NODE_MAILER_USER}@gmail.com" <vifiexample01@gmail.com>`, // sender address
      bcc: emailList, // list of receivers
      subject: "Vifi Newsletter", // Subject line
      text: "Vifi Newsletter", // plain text body
      html: htmlToSend, // html body
  }

// transporter sends the data to the email server based on options above
  transporter.sendMail(options, function (err, info) {
    if(err){
        console.error(err);
        res.sendStatus(500).
        return;
    }
    res.sendStatus(204);
  })
});

module.exports = router;
