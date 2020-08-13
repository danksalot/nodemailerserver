const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const details = require("./details.json");

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

const app = express();
app.use(allowCrossDomain);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("The server is listening on port 3000");
})

app.get("/", (req, res) => {
    res.send("<h1>Hello World!</h1>");
})

app.post("/", (req, res, next) => {
    var emailRequest = req.body;
    sendMail(emailRequest, info => {
        res.send(info);
    })
})

app.post("/sendemail", (req, res, next) => {
    var emailRequest = req.body;
    sendMail(emailRequest, info => {
        res.send(info);
    })
})

async function sendMail(emailRequest, callback) {    
    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: details.email,
            pass: details.password
        }
    });

    var mailOptions = {
        from: emailRequest.fromName,
        to: emailRequest.toAddress,
        subject: emailRequest.subject,
        html: emailRequest.htmlBody
    };

    var info = await transporter.sendMail(mailOptions);    
    callback(info);
}

module.exports = app;