import nodemailer from "nodemailer";
const VerifyAccountHandler = (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)
    if (!email)
      return res
        .status(500)
        .json({ data_missing: `please provide an email in the requiest body` });
    const currentVerificationCode = Math.floor(
      (Math.random() * 99999999999) % 999999
    );
    console.log(currentVerificationCode);

    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OFFICIALEMAIL,
        pass: process.env.PASSWORD,
      },
    });
    console.log(email);
    const mailOptions = {
      from: "official_Jolly@outlook.com",
      to: email,
      subject: "email confirmation",
      text: `Welcome aboard! Please use this code to verify your account: ${currentVerificationCode}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).json({
          error: err,
        });
        return;
      }

      res.status(200).json({
        verificationCode: currentVerificationCode,
        sentto: email,
      });
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};
export default VerifyAccountHandler;
