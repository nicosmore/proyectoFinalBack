const envConfig = require('../config/env.config');
const nodemailer  = require('nodemailer');

const TEST_MAIL = envConfig.TEST_MAIL;
const PASSWORD_MAIL = envConfig.PASSWORD_MAIL;

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: PASSWORD_MAIL
    }
});

const sendmail = async (email, usuario) => {
    try {
        const mailPayload = {
            from: 'Ecommerce',
            to: email,
            subject: 'Usuario nuevo registrado',
            html: `<p>Usuario ${usuario} se registro correctamente</p>`
        };

        const mailResponse = await transporter.sendMail(mailPayload);
        console.log(mailResponse);
    } catch (error) {
        console.log(error.message); 
        return error.message;       
    }
}

const orderMail = async (email, orden) => {
    try {
        const mailPayload = {
            from: 'Ecommerce',
            to: email,
            subject: 'Usuario nuevo registrado',
            html: `<p>Compra exitosa su numero de orden es: ${orden}</p>`
        };

        const mailResponse = await transporter.sendMail(mailPayload);
        console.log(mailResponse);
    } catch (error) {
        console.log(error.message); 
        return error.message;       
    }
}

module.exports = {
    sendmail,
    orderMail
};

