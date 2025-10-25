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

  // Generate the HTML content for the email.
  const html = generateHTML(highlights);
  // Send the email.
  await transporter.sendMail({
    to: RECEIVING_EMAIL,
    subject: "📔🔖 Kindle Highlights",
    html,
  });

  console.log("Email sent.");
};

const generateHTML = (highlights: Highlight[]) => {
  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const header = `<p style="text-align:center; color:#777; font-size:13px; margin:0;">${formattedDate} • Revisit, Reflect, Grow</p>`;

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
    <body style="background-color:#faf9f6; margin:0; padding:0; font-family:Helvetica,Arial,sans-serif; color:#333; line-height:1.5;">
      <table align="center" width="100%" style="max-width:600px; background-color:#ffffff; margin:30px auto; border-radius:12px; box-shadow:0 2px 10px rgba(0,0,0,0.04);">
        <tr>
          <td align="center" style="padding:24px 20px 16px;">
            <div style="font-size:22px; font-weight:700; color:#2d2b28; letter-spacing:-0.3px;">📚 Thought Gems from Your Kindle</div>
            <div style="font-size:13px; color:#8b8581; margin-top:6px;">${formattedDate} • Revisit • Reflect • Grow</div>
          </td>
        </tr>
      </table>

      <table align="center" width="100%" style="max-width:600px; background-color:#fdfbf8; margin:0 auto 24px; padding:0;">
        ${highlightsHTML}
      </table>

      <table align="center" width="100%" style="max-width:600px; text-align:center; color:#9c958f; font-size:12px;">
        <tr>
          <td style="padding:12px;">
            Sent with care by Kindle Reminder<br>
            <a href="https://github.com/mushtaq96/kindle-reminder" style="color:#9c958f; text-decoration:underline;">Private • Open Source • Yours</a>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};