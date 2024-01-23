import otp from "otplib";
import QrCode from "qrcode";

const secret = otp.authenticator.generateSecret();

export const GenerateQR = (req, res) => {
  try {
    const { user_name } = req.params;
    const code = otp.authenticator.keyuri(user_name, "JollyBravo", secret);
    QrCode.toDataURL(code, (error, image) => {
      if (error) {
        return res.status(500).json({
          error: `something went wrong while generating the qr code , please try again later`,
        });
      }
      return res.status(200).json({ image, key: code, accountName: user_name });
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default function (req, res, next) {
  if (req.body.QRtoken) {
    const { QRtoken } = req.body;

    const verify = otp.authenticator.verify({ token: QRtoken, secret });
    console.log(verify);
    if (verify) {
      req.secret = secret;
      

      next();
    } else {
      return res.status(500).json({ incorrect: `incorrect code` });
    }
  } else {
    next();
  }
}
