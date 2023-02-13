const { response } = require('express');
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

function sendEmail({ recipient_email, name, message }){
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'Hotmail',
            auth: {
                user: 'darkknight-3096@hotmail.com',
                pass: 'Raf008-in3096',
            },
        });

        const mail_configs = {
            from: 'darkknight-3096@hotmail.com',
            to: 'irvin.rafael.3096@gmail.com',
            subject: 'Test',
            text: `Name: ${name} \n Email: ${recipient_email} \n Message: ${message}`,
        };
        transporter.sendMail(mail_configs, function(error, info){
            if(error){
                console.log(error);
                return reject({ message: 'An error has occured' });
            }
            return resolve({ message: 'Email has been sent succesfuly' });
        });
    });
}

app.get('/contactForm', (req, res) => {
    sendEmail()
        .then((response) => res.send(response.message), console.log(response.message))
        .catch((error) => res.status(500).send(error.message));
});

app.post("/send_email", (req, res) => {
    sendEmail(req.body)
        .then((response) => res.send(response.message))
        .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`);
}); 
