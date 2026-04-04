import { Request, Response, NextFunction } from 'express';
import { Resend } from 'resend';
import { contactSchema } from '../schemas/contact.schema';
import { AppError } from '../middlewares/errorHandler';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, subject, message } = contactSchema.parse(req.body);

    const toEmail = process.env.CONTACT_TO_EMAIL || 'duy9117@gmail.com';

    const { data, error } = await resend.emails.send({
      // Resend free tier: from phải là onboarding@resend.dev
      // Khi có domain riêng thì đổi thành: noreply@yourdomain.com
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 32px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px 32px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">📬 Tin nhắn mới từ Portfolio</h1>
          </div>

          <div style="background: white; padding: 24px 32px; border-radius: 8px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; width: 100px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Từ</td>
                <td style="padding: 10px 0; color: #1e293b; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-top: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
              </tr>
              <tr style="border-top: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Tiêu đề</td>
                <td style="padding: 10px 0; color: #1e293b;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
              <p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Nội dung</p>
              <p style="color: #334155; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
            Email được gửi từ trang portfolio của Lê Công Quốc Duy
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return next(new AppError(500, `Gửi email thất bại: ${error.message}`));
    }

    console.log('Email sent successfully, id:', data?.id);
    res.json({ success: true, message: 'Tin nhắn đã được gửi thành công!' });
  } catch (err) {
    next(err);
  }
}
