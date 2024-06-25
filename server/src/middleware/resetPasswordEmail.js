// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript;
const sgMail = require("@sendgrid/mail");

const resetPasswordEmail = async (email, token, username) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const resetPasswordLink = `http://localhost:3000/reset-password?token=${token}`;

  const msg = {
    to: email, // Change to your recipient
    from: "mahmoud0122549@gmail.com", // Change to your verified sender
    subject: "إعادة تعيين كلمة السر لمنصة نحيا بالقرآن",
    html: `
    <p style="font-size:1.75rem; font-weight:600;text-align:center;">إعادة تعيين كلمة السر</p>
    <p style="font-size:1.25rem; font-weight:500;text-align:center;">
    مرحبا ${username} 
    حتى تعيد كتابة كلمة السر , من فضلك اضغط على الزر في الأسفل 👇🏾 لإعادة تعيين كلمة السر </p>    
    <a href="${resetPasswordLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; display: block; border-radius: 5px;text-align:center;width:fit-content;margin:0 auto;">إعادة تعيين كلمة السر</a>
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { resetPasswordEmail };
