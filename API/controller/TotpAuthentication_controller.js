import otp from "otplib";
import QrCode from "qrcode";

const secret = otp.authenticator.generateSecret();
export default async function (req, res) {
  try {
    const { token = undefined } = req.params;

    /* if (req.params?.del) {
        const user_id = req?.user || req.params?.user_id; 
      await Users.findByIdAndDelete(user_id);
      return res.json({ deleted: "success" });
    } */

    if (!token || token.length < 4) {
      const code = otp.authenticator.keyuri(
        "jason desmond",
        "jollyBravo",
        secret
      );
      QrCode.toDataURL(code, (error, imageURL) => {
        if (error) {
          return res.status(500).json({
            error: `Something went wrong while scanning the image: ${error.message}`,
          });
        }
        console.log(secret);
        return res.status(200).send(`<img src='${imageURL}' />`);
      });
    } else {
      const verify = otp.authenticator.verify({
        token,
        secret,
      });
      return res.status(200).json({ verify });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
