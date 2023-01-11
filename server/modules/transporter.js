const nodemailer = require('nodemailer');

// create transporter to the gmail address
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: `${process.env.NODE_MAILER_USER}`,
        pass: `${process.env.NODE_MAILER_USER_KEY}`
    },
})

module.exports = transporter;