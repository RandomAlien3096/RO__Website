// const path = require('path');
// const express = require('express');
// const app = express();

// const buildPath = path.join(__dirname, '..', 'build');
// app.use(express.json());
// app.use(express.static(buildPath));

// app.post('/send', (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
// });

// app.listen(3030, () => {
//   console.log('server start on port 3030');
// });

const  path = require('path');
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/send', router);
app.listen(3030, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: 'darkknight-3096@hotmail.com',
        pass: 'Raf008-in3096',
    },
});

contactEmail.verify((error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("Ready to Send");
    }
});

router.post("/contactForm", (req, res) => {
    const name = rew.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const mail = {
        from: name,
        to: 'irvin.rafael.3096@gmail.com',
        subject: 'Contact Form Submission',
        hmtl: '<p>Name: ${name} </p> <p>Email: ${email}</p> <p>Message: ${message}</p>',
    };
    contactEmail.sendMail(mail, (error) => {
        if(error){
            res.json({ status: 'Error'});
        }
        else{
            res.json({ status: 'Message Sent' });
        }
    });
});