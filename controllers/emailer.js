require('dotenv').config();
const nodemailer = require('nodemailer');

// Configuração única do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'felipe.coqueiro2018@gmail.com',
        pass: '123jesus.c'
    }
});

module.exports = transporter;