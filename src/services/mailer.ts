import nodemailer, { Transporter } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // true pour le port 465, false pour les autres ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  public async sendEmail(
    to: string,
    subject: string,
    text: string
  ): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    console.log(
      "email credential:",
      process.env.EMAIL_USER,
      process.env.EMAIL_PASS
    );

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log("Email sent: " + info.response);
    } catch (error) {
      console.error("Error sending email: ", error);
      throw error;
    }
  }
}

export default new EmailService();
