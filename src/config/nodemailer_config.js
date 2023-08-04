const nodemailer = require("nodemailer");
const { EmailService,senderEmail,senderPassword } = require('./vars');


const transport = nodemailer.createTransport({
  service : EmailService,
 
  auth: {
    user: senderEmail, // generated ethereal user
    pass: senderPassword, // generated ethereal password
  },
});

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
  transport.sendMail({
    from: senderEmail,
    to: email,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hi,${name}</h2>
        <p>Please confirm your email address by entering the following confirmation code.</p>
        <p> ConfirmationCode</p>
        <h2> ${confirmationCode}</h2>
        </div>`,
  }).catch(err => console.log(err));
  };


  module.exports.sendforgetPasswordEmail = ( email, confirmationCode) => {
    transport.sendMail({
      from: senderEmail,
      to: email,
      subject: "Forget Password",
      html: `<h1>Forget Password</h1>
          <p>You can easily reset your account password with your recovery code given below.</p>
          <h3> ${confirmationCode} </h3>
         <p> If you do not expect this, you can safely ignore this email.</p>
        <br>
        <p>Thanks,</p>
          
          </div>`,
    }).catch(err => console.log(err));
  };