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

  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
  const header = `<p style="text-align:center; color:#777; font-size:13px; margin-top:0;">${formattedDate} • Revisit, Reflect, Grow</p>`;
  html = html.replace("{{header}}", header);
  // Insert the highlights into the HTML template.
  html = html.replace("{{highlights}}", highlightHTML);
  // Send the email.
  await transporter.sendMail({
    to: RECEIVING_EMAIL,
    subject: "📔🔖 Kindle Highlights",
    html,
  });

  console.log("Email sent.");
};
