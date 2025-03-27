import nodemailer from "nodemailer";
import { config } from "../config/app.config";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.SMTP_USER!,
    pass: config.SMTP_PASS!,
  },
});

export const sendVerificationEmail = async (email: string, code: string) => {
  await transporter.sendMail({
    from: `"SkillUp" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `<h2>Welcome!</h2>
           <p>Your verification code is: <b>${code}</b></p>`,
  });
};

export const sendGoalReminderEmail = async (
  email: string,
  goalTitle: string,
  currentProgress: number,
  targetProgress: number,
  daysRemaining: number
) => {
  const subject = `Reminder: ${goalTitle}`;

  const html = `
    <div>
      <h2>Don't forget to work on your goal: ${goalTitle}</h2>
      <p>Current Progress: <strong>${currentProgress}/${targetProgress}</strong></p>
      <p>Days Remaining: <strong>${daysRemaining}</strong></p>
      <p>Keep up the good work!</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"SkillUp" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    html,
  });
};