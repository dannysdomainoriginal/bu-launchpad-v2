import nodemailer from "nodemailer";

const client = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.NODE_ENV === "production" ? 465 : 587,
  secure: process.env.NODE_ENV === "production",
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
