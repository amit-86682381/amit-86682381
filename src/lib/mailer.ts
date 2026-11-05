import nodemailer from "nodemailer";
import type { ContactData } from "./contact-schema";

export class MailNotConfiguredError extends Error {}

function getConfig() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) throw new MailNotConfiguredError();
  const port = Number(SMTP_PORT ?? 465);
  return {
    transport: { host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } },
    to: CONTACT_TO_EMAIL,
    from: CONTACT_FROM_EMAIL || SMTP_USER,
  };
}

export async function sendEnquiry(data: ContactData) {
  const config = getConfig();
  const transporter = nodemailer.createTransport(config.transport);
  const lines = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Company / Organisation: ${data.organisation || "-"}`,
    `Service interested in: ${data.service}`,
    `Project location: ${data.location || "-"}`,
    "",
    "Message:",
    data.message,
  ];
  await transporter.sendMail({
    from: { name: "Website Enquiry", address: config.from },
    to: config.to,
    replyTo: { name: data.name, address: data.email },
    subject: `New website enquiry: ${data.service} — ${data.name}`,
    text: lines.join("\n"),
  });
}
