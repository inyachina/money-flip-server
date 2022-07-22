const nodemailer = require("nodemailer"),
    express = require("express"),
    bodyParser = require('body-parser'),
    Email = require('email-templates'),
    cors = require('cors')

const port = 2222;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'jerome.raynor@ethereal.email',
        pass: 'ZrjGVN8WTTw9U9bkcN'
    }
});

// const mailOptions = {
//     from: 'jerome.raynor@ethereal.email',
//     to: 'vica_diana@mail.ru',
//     subject: 'Money-Flip',
//     text: "This is my first email. I am so excited!"
// };

app.post('/sendMail', (request, response) => {
    console.log(`URL: ${request.url}`);
    console.log(request.body);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error:', error.message);
        }
        console.log("success", info);
    });
});


let smtpTransport;
try {
    smtpTransport = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, // true for 465, false for other ports 587
        auth: {
            user: "diana.inya@yandex.ru",
            pass: "Da_trash1448!"
        }
    });
} catch (e) {
    return console.log('Error: ' + e.name + ":" + e.message);
}

let mailOptions = {
    from: 'diana.inya@yandex.ru', // sender address
    to: 'vica_diana@mail.ru', // list of receivers
    subject: 'Обращение с сайта baedeker.club', // Subject line
    text: 'Обращение с сайта baedeker.club', // plain text body
};

smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
        // return console.log(error);
        return console.log('Error', error);
    } else {
        console.log('Message sent: %s', info.messageId);
    }
})

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

