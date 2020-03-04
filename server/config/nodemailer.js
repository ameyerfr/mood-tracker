const nodemailer = require("nodemailer")
let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD
  }
});

const sendEmail = (mailParams, onSuccess) => {

    transporter.sendMail({
      from: '"tamaMOODchi" <info@moodtracker.com>',
      to: mailParams.to || process.env.GMAIL_ADDRESS,
      subject: mailParams.subject || 'No subject',
      text: mailParams.text || 'From the tamaMOODchi web app !',
      html: mailParams.html || '<b>From the tamaMOODchi web app !</b>'
    })
    .then(info => onSuccess(info))

}

module.exports = { sendEmail }
