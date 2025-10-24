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
  // Construct the highlights HTML.
  const highlightHTML = highlights
    .map(
      (h) => `<mj-section><mj-column>
        <mj-text font-size="18px" color="#5E5E5E">${h.bookTitle}</mj-text>
        <mj-text color="#777777">${h.content}</mj-text>
      </mj-column></mj-section>`
    )
    .join("");
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
