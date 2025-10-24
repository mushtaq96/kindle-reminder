// mail.ts
import { readFileSync } from "fs";
import path from "path";
import { RECEIVING_EMAIL, SENDER_APP_PASSWORD, SENDER_EMAIL } from "./env";
import nodemailer from "nodemailer";
import { Highlight } from "./types";

// Sends an email with the given highlights.
export const email = async (highlights: Highlight[]) => {
  // Return early if there are no highlights.
  if (highlights.length === 0) return console.log("No highlights to send.");
  // Set up the email transporter.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: SENDER_EMAIL, pass: SENDER_APP_PASSWORD },
  });
  // Read the HTML email template.
  const htmlTemplatePath = path.join("src/templates/build/email.html");
  let html = readFileSync(htmlTemplatePath, "utf-8");
  // Generate the highlights HTML.
  const highlightHTML = highlights
  .map(
    (h) => `
    <div style="margin-bottom: 20px; padding: 10px; background:#FFF8F0; border-radius:8px;">
      <h3 style="font-family: Helvetica, Arial, sans-serif; color: #333333; margin: 0;">${h.bookTitle}</h3>
      <p style="font-family: Helvetica, Arial, sans-serif; color: #444444; margin: 10px 0;">${h.content}</p>
      <small style="font-family: Helvetica, Arial, sans-serif; color: #888888;">${h.details}</small>
    </div>`
  )
  .join("");


  // Insert the highlights into the HTML template.
  html = generateHTML(highlights);
  // Send the email.
  await transporter.sendMail({
    to: RECEIVING_EMAIL,
    subject: "📔🔖 Kindle Highlights",
    html,
  });

  console.log("Email sent.");
};

const generateHTML = (highlights: Highlight[]) => {
  const highlightsHTML = highlights
    .map((h) => `
      <tr>
        <td style="padding:10px 25px;">
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:18px;color:#333;margin:0;">${h.bookTitle}</div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;color:#555;line-height:1.5;margin:8px 0;">${h.content}</div>
          <div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;color:#888;">${h.details}</div>
        </td>
      </tr>
    `)
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <body style="background-color:#F5F5F5;margin:0;padding:0;font-family:Helvetica,Arial,sans-serif;">
      <table align="center" width="100%" style="max-width:600px;background-color:#FFFFFF;margin:20px auto;">
        <tr>
          <td align="center" style="padding:20px 0;">
            <img src="https://raw.githubusercontent.com/mushtaq96/kindle-reminder/main/logo.png" width="50" alt="Logo" style="display:block;margin:0 auto 15px;">
            <div style="font-size:20px;font-weight:bold;color:#2c3e50;">📚 Thought Gems from Your Kindle</div>
          </td>
        </tr>
      </table>

      <table align="center" width="100%" style="max-width:600px;background-color:#FFF8F0;margin:0 auto 20px;padding:10px 0;">
        ${highlightsHTML}
      </table>

      <table align="center" width="100%" style="max-width:600px;background-color:#F5F5F5;margin:0 auto;">
        <tr>
          <td align="center" style="padding:15px;font-size:12px;color:#888;">
            Sent by Kindle Reminder • <a href="https://github.com/mushtaq96/kindle-reminder" style="color:#888;text-decoration:underline;">GitHub</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};