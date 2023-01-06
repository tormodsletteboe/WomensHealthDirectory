const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: 'vifiexample01',
        pass: 'wboehegddmhoubwa'
    },
})

// const htmlToSend = "<body><h1>The Vifi Newsletter</h1></body>"

// const options = {
//     from: '"vifiexample01@gmail.com" <vifiexample01@gmail.com>', // sender address
//     to: "alina.trukhina@gmail.com,", // list of receivers
//     subject: "Vifi Newsletter", // Subject line
//     text: "Hello world?", // plain text body
//     html: htmlToSend, // html body
// }

// transporter.sendMail(options, function (err, info) {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log("sent", info.response);
// })

module.exports = transporter;