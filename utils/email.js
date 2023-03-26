// Dependencies
const nodemailer = require('nodemailer');
// Function to send email
const sendEmail = async(options) => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    // Define the email options
    const mailOptions = {
        from: 'SuperDuper Admin <hello@admin.io>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    // Send the email
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;
