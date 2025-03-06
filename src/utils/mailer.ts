import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, code: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  await transporter.sendMail({
    from: `"SkillUp" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Verify Your Email",
    html: `<h2>Welcome!</h2>
           <p>Your verification code is: <b>${code}</b></p>`,
  });
};
