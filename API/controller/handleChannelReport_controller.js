import nodeMailer from "nodemailer";
export default async function (req, res) {
  try {
    const { reason, channel, channel_id, reporter } = req.body;

    if (Object.keys(req.body).length < 4)
      return res.status(400).json({
        no_data: `please make sure all data is provided before trying again `,
      });
    const emailConfig = nodeMailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.OFFICIALEMAIL,
        pass: process.env.PASSWORD,
      },
    });

    console.log({ reason, channel, channel_id, reporter });
    const sendTo = {
      from: process.env.OFFICIALEMAIL,
      to: process.env.OFFICIALEMAIL,
      subject: "report channel",
      text: `${channel} with id ${channel_id} is showing ${reason} ; report from ${reporter}`,
    };

    emailConfig.sendMail(sendTo, (err, info) => {
      if (err) {
        return res.status(500).json({
          error: `an error _${err.message}_ occured while reporting channel , please try again later `,
        });
      }
      return res.status(200).json({
        success_report: `${channel} was reported successfuly . thank you for helping us imporving our services and protecting our users`,
      });
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: `couldn't send email ${err.message} occured ` });
  }
}
