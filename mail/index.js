const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this.transporter = nodemailer.createTransport({
      servise: 'gmail',
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false,
      auth: {
        user: 'brandonmdflores@gmail.com',
        pass: 'cappuchini123',
      },
    });

    this.mailOptions = {
      from: '"Cucei Ayuda" <brandonmanuel@gmail.com>',
    };
  }

  sendMail(options) {
    console.log('Enviando email');
    const mailOptions = {
      ...this.mailOptions,
      ...options,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
  }
}

module.exports = new Mailer();
