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

export const sendTaskReminderEmail = async (email: string, taskName: string) => {
  await transporter.sendMail({
    from: `"SkillUp" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Task Reminder",
    html: `<h2>Task Reminder</h2>
           <p>Don't forget to complete: <b>${taskName}</b></p>`,
  });
};