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


let mailOptions = {
    from: 'Maniflip@yandex.ru', // sender address
    to: ['lanabanana1861@gmail.com'], // list of receivers
    subject: 'MoneyFlip form request', // Subject line
    html: '',
    headers:{
        "List-Unsubscribe": "https://se.ifmo.ru/~s283945"
    }
};

let smtpTransport;
try {
    smtpTransport = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true, // true for 465, false for other ports 587
        auth: {
            user: "Maniflip@yandex.ru",
            pass: "Wutang4ever)"
        }
    });
} catch (e) {
    return console.log('Error: ' + e.name + ":" + e.message);
}

app.post('/sendMail', (request, response) => {
    console.log(`URL: ${request.url}`);
    console.log(request.body);

    mailOptions.html =
        `<div><b>Отправление:</b> ${request.body.sendAmount} ${request.body.sendBank}</div>
    <div><b>IBAN или номер счета:</b> ${request.body.account}</div>
    <br/>
    <div><b>Имя:</b> ${request.body.name}</div>
    <div><b>Телефон:</b> <a href="tel:+${request.body.phone}">${request.body.phone}</a></div>
    <div><b>Телеграм:</b> <a href="https://telegram.im/@${request.body.telegram.replace("@", '')}">${request.body.telegram}</a></div>
    <div><b>Статус:</b> ${request.body.person}</div>
    <div><b>Комментарий:</b> ${request.body.comment}</div>`

    // smtpTransport.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         response.sendStatus(500)
    //         return console.log('Error', error);
    //     } else {
    //         response.sendStatus(200);
    //         console.log('Message sent: %s', info.messageId);
    //     }
    // })
});


const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

