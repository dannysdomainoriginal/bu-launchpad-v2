import nodemailer from "nodemailer";

class MailService {
  client: ReturnType<typeof nodemailer.createTransport> | null;

  constructor() {
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM;

    this.client = null;

    if (host && user && pass && from) {
      this.client = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: {
          user,
          pass,
        },
      });
    }
  }

  async sendFeedbackEmail({
    to,
    productName,
    feedbackMessage,
    senderName,
  }: {
    to: string;
    productName: string;
    feedbackMessage: string;
    senderName: string;
  }) {
    if (!this.client || !to) {
      return false;
    }

    await this.client.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject: `New feedback for ${productName}`,
      html: `
        <h3>New feedback received</h3>
        <p><strong>From:</strong> ${senderName}</p>
        <p><strong>Product:</strong> ${productName}</p>
        <p>${feedbackMessage}</p>
      `,
    });

    return true;
  }
}

const mailService = new MailService();
export default mailService;
