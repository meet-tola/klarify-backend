import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import nodemailer from "nodemailer";
import { config } from "../config/app.config";

// Register Handlebars helpers
handlebars.registerHelper('eq', (a: any, b: any) => a === b);
handlebars.registerHelper('progressPercentage', (current: number, target: number) => 
  Math.round((current / target) * 100));

interface EmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, any>;
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.SMTP_USER!,
    pass: config.SMTP_PASS!,
  },
});

const readHTMLFile = async (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: "utf-8" }, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
};

const compileTemplate = async (templateName: string, context: any): Promise<string> => {
  const templatePath = path.resolve(__dirname, `./templates/${templateName}.hbs`);
  const htmlTemplate = await readHTMLFile(templatePath);
  const template = handlebars.compile(htmlTemplate);
  return template(context);
};

export const sendEmail = async (options: EmailOptions): Promise<boolean> => {
  try {
    const htmlContent = await compileTemplate(options.template, options.context);
    
    await transporter.sendMail({
      from: `"Klarify" <${config.SMTP_USER}>`,
      to: options.to,
      subject: options.subject,
      html: htmlContent,
    });
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};

export const sendVerificationEmail = async (email: string, code: string): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: "Verify Your Email",
    template: "verification",
    context: {
      title: "Verify Your Email",
      greeting: "Welcome to Klarify!",
      code,
      year: new Date().getFullYear(),
    },
  });
};

export const sendPasswordResetEmail = async (email: string, name: string, resetUrl: string): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: "Password Reset Request",
    template: "password-reset",
    context: {
      title: "Password Reset Request",
      greeting: `Hello, ${name}!`,
      buttonUrl: resetUrl,
      buttonText: "Reset Password",
      year: new Date().getFullYear(),
    },
  });
};

export const sendGoalReminderEmail = async (
  email: string,
  goalTitle: string,
  currentProgress: number,
  targetProgress: number,
  daysRemaining: number
): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: `Reminder: ${goalTitle}`,
    template: "goal-reminder",
    context: {
      title: `Reminder: ${goalTitle}`,
      greeting: "Don't forget your goal!",
      goalTitle,
      currentProgress,
      targetProgress,
      daysRemaining,
      year: new Date().getFullYear(),
    },
  });
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: "Welcome to Klarify!",
    template: "welcome",
    context: {
      title: "Welcome to Klarify!",
      greeting: `Hello ${name},`,
      content: "Thank you for joining Klarify. We're excited to help you achieve your goals!",
      buttonUrl: `${config.FRONTEND_URL}/dashboard`,
      buttonText: "Get Started",
      year: new Date().getFullYear(),
    },
  });
};

export const sendNotificationEmail = async (
  email: string,
  notificationTitle: string,
  notificationMessage: string,
  actionUrl?: string
): Promise<boolean> => {
  return sendEmail({
    to: email,
    subject: notificationTitle,
    template: "notification",
    context: {
      title: notificationTitle,
      greeting: "Hello,",
      content: notificationMessage,
      buttonUrl: actionUrl,
      buttonText: actionUrl ? "View Details" : undefined,
      year: new Date().getFullYear(),
    },
  });
};