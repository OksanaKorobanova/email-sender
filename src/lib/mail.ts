import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import { discount } from './templates/discount';

type Mail = {
  to: string;
  subject: string;
  body: string;
};

export async function sendMail({ to, subject, body }: Mail) {
  const { SMTP_EMAIL_FROM, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL_FROM,
      pass: SMTP_PASSWORD,
    },
  });

  try {
    await transport.verify();
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    await transport.sendMail({
      from: `From <${SMTP_EMAIL_FROM}>`,
      to,
      subject,
      html: body,
    });
  } catch (error) {
    console.log(error);
  }
}

export function compileTemplate(name: string) {
  const template = handlebars.compile(discount);
  const htmlBody = template({ name: name });
  return htmlBody;
}
