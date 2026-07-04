import nodemailer from "nodemailer";

const port = Number(process.env.MAIL_PORT);

const client = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port,
  secure: port === 465,
  auth: {
    user: process.env.MAIL_ACCOUNT,
    pass: process.env.MAIL_PASSWORD,
  },
});

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return client.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
    replyTo: process.env.MAIL_REPLY_TO
  });
}
