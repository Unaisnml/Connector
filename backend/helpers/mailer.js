const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;
const auth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH } = process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, auth_link);

exports.sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailoptions = {
    from: EMAIL,
    to: email,
    subject: "Connector email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#6e1940">
    <img src="https://res.cloudinary.com/djp6mwlpk/image/upload/v1693136219/connector_logo_taftfe.jpg" alt="" style="width:30px" />
    <span>Action required: Activate your Connector account</span>
    </div>
    <div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#141823;font-size:17px;font-family:Roboto">
    <span>Hello ${name}</span>
    <div style="padding:20px 0">
    <span style="padding:1.5rem 0">You recently created account on Connector. To complete your
    registration, please confirm your account.
    </span>
    </div>
    <a href= ${url} style="width:200px;padding:10px 15px;background:#6e1940;text-decoration:none;color:#fff;font-weight:600">Confirm your account</a>
    <br />
    <div style="padding-top:20px">
    <span style="margin:1.5rem 0;color:#8f5685">Connector allows your to stay in touch with all your friends, once
    registered on Connector, you can share photos, onganise events and
    much more.
    </span>
    </div>
    </div>`,
  };
  stmp.sendMail(mailoptions, (err, res) => {
    if (err) return err;
    return res;
  });
};
