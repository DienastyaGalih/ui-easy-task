const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'dienastya.galih@ruangguru.com',
        pass: 'fpqfwfufvxpbsexx',
    },
});

transporter.sendMail({
    from: '"Your Name" <dienastya.galih@ruangguru.com>', // sender address
    to: "galih.email.test@gmail.com", // list of receivers
    subject: "Medium @edigleyssonsilva ✔", // Subject line
    text: "There is a new article. It's about sending emails, check it out!", // plain text body
    html: "<b>There is a new article. It's about sending emails, check it out!</b>", // html body
}).then(info => {
    console.log({ info });
}).catch(console.error);
transporter.verify().then(console.log).catch(console.error);