const nodemailer = require('nodemailer');


require('dotenv').config();
const { META_PASSWORD } = process.env;

const sendEmail = async (data) => {
    
    const nodemailerConfig = {
        host: 'smtp.meta.ua',
        port: 465,
        secure: true,
        auth: {
            user: 'sergeypushok1991@meta.ua',
            pass: META_PASSWORD
        },
    }

    const transport = nodemailer.createTransport(nodemailerConfig);
    const email = { ...data, from: 'sergeypushok1991@meta.ua' };
    
    try {
        await transport.sendMail(email);
        return true;

    } catch (error) {
        throw error
    } 
}


module.exports = sendEmail;