import bcrypt from 'bcryptjs';
import prisma from './lib/prisma';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const existing = await prisma.account.findUnique({ where: { email } });
  if (existing) {
    console.log('Admin account already exists:', email);
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.account.create({ data: { email, password: hashed } });
  console.log('Admin account created:', email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
