const nodemailer = require("nodemailer");

require("dotenv").config();

// create transporter object using nodemailer
let transporter = nodemailer.createTransport({
    // host -> konse server ko use krenge as a MAIL SERVER 
    host: process.env.MAIL_HOST,
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Accept self-signed certificates
    }
});

module.exports = transporter;