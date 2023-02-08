const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(5000, () => console.log("Server Running"));

const contactEmail = nodemailer.createTransport({
    service: "Hotmail",
    auth: {
        user: 'darkknight-3096@hotmail.com',
        pass: 'J4itNnDj6HT8cXD',
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
        to: 'invariant.rafael.3096@getDefaultNormalizer.com',
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