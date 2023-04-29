const nodemailer = require('nodemailer')
const pug = require('pug')
// const userModel = require('../model/userSchema')
const { convert } = require("html-to-text");
const dotenv = require('dotenv');
dotenv.config()


module.exports = class Email{
    constructor(user){
        this.to = user.email
        this.email = user.email
        this.from = `Tony`
    }

    newTransport() {
        if (process.env.NODE_ENV === "production") {
          //service: SendGrid || MailGun
          return nodemailer.createTransport({
            service: "MailGun",
            auth: {
              user: 'postmaster@sandbox80845c8f4de74886bcd9d84a82534a5c.mailgun.org',
              pass: '4f53b8353c2e42b8eb0259816a4f77d9-bdb2c8b4-c5bdc36f',
            },
            tls: {
              rejectUnauthorized: false
          }
          });
        }

        return nodemailer.createTransport({
            host: 'smtp.mailgun.org',
            port: 587,
            auth: {
              user: 'postmaster@sandbox80845c8f4de74886bcd9d84a82534a5c.mailgun.org',
              pass: '4f53b8353c2e42b8eb0259816a4f77d9-bdb2c8b4-c5bdc36f',
            },
          });
    }

    
  async send(template, info) {
    //send actual email
    //1) Render HTML based on pug template
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      info
    );
    //2) defile email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: info.subject,
      html,
      text: convert(html, {
        wordwrap: 130,
      }),
    };
    //3) create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendResetLink(link) {
    await this.send("resetPassword", {
      subject: "Reset Your Account Password",
      email: this.email,
      link,
    });
  }
}