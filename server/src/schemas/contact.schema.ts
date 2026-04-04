import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  subject: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  message: z.string().min(10, 'Nội dung phải có ít nhất 10 ký tự'),
});
