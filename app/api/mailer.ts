//  helper function to send mail using postmark
import { Client } from "postmark";

const client = new Client(process.env.POSTMARK_API_KEY);

export class Mailer {
  static async sendMail(recipient: string, subject: string, message: string) {
    try {
      const response = await client.sendEmail({
        From: `SynergyKit <${process.env.SMTP_USER}>`,
        To: recipient,
        Subject: subject,
        HtmlBody: message,
      });
      if (response.ErrorCode !== 0) {
        throw new Error(`Error sending email: ${response.Message}`);
      }

      return {
        message: "Email sent successfully",
        messageID: response.MessageID,
        recipient: response.To,
        submittedAt: response.SubmittedAt,
      };
    } catch (error) {
      throw error;
    }
  }
}
