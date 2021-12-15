const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: 'rakeshdr.dev@gmail.com',
        from: 'rakesh@rapidinnovation.dev',
        subject: 'Thank you for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get alog with app`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: 'rakeshdr.dev@gmail.com',
        from: 'rakesh@rapidinnovation.dev',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you backtime soon.`
    })
}

module.exports = { sendWelcomeEmail, sendCancellationEmail }