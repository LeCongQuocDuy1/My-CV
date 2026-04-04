import 'dotenv/config';
import prisma from './lib/prisma';

const projects = [
  {
    title: 'My CV Portfolio',
    slug: 'my-cv-portfolio',
    description: 'Trang portfolio cá nhân được xây dựng bằng React, giới thiệu kỹ năng và kinh nghiệm làm việc.',
    content: `## Giới thiệu

Trang portfolio cá nhân được xây dựng bằng **React** và **Node.js**, triển khai trên GitHub Pages.

## Tính năng

- Giới thiệu bản thân, kỹ năng, kinh nghiệm
- Admin Dashboard để quản lý dự án
- API Backend với Express + Prisma + PostgreSQL
- Upload ảnh thumbnail cho từng dự án
- Markdown editor với live preview

## Tech Stack

- **Frontend:** React 18, React Router, React Query
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL (Neon), Prisma ORM
- **Deploy:** GitHub Pages (frontend), Railway/Render (backend)

## Hướng dẫn chạy

\`\`\`bash
# Backend
cd server && npm install && npm run dev

# Frontend
cd client && npm install && npm start
\`\`\``,
    thumbnail: '/public/defaults/default-thumbnail.svg',
    techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
    liveUrl: 'https://lecongquocduy1.github.io/My-CV',
    repoUrl: 'https://github.com/LeCongQuocDuy1/My-CV',
    order: 1,
  },
  {
    title: 'E-Commerce Platform',
    slug: 'e-commerce-platform',
    description: 'Nền tảng thương mại điện tử full-stack với giỏ hàng, thanh toán và quản lý đơn hàng.',
    content: `## Giới thiệu

Nền tảng thương mại điện tử được xây dựng từ đầu với đầy đủ tính năng mua sắm online.

## Tính năng chính

- 🛒 Giỏ hàng với cập nhật realtime
- 💳 Thanh toán qua VNPay / Stripe
- 📦 Quản lý đơn hàng & theo dõi vận chuyển
- 👤 Xác thực người dùng (JWT + Refresh Token)
- 🔍 Tìm kiếm & lọc sản phẩm nâng cao
- 📊 Dashboard thống kê doanh thu

## Tech Stack

- **Frontend:** Next.js 14, Tailwind CSS, Zustand
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB, Redis (cache)
- **Payment:** Stripe, VNPay

## Kiến trúc

\`\`\`
Client (Next.js) → API Gateway → Microservices
                                 ├── Auth Service
                                 ├── Product Service
                                 └── Order Service
\`\`\``,
    thumbnail: '/public/defaults/default-thumbnail.svg',
    techStack: ['Next.js', 'TypeScript', 'MongoDB', 'Redis', 'Stripe'],
    liveUrl: '',
    repoUrl: 'https://github.com/LeCongQuocDuy1',
    order: 2,
  },
  {
    title: 'Chat App Realtime',
    slug: 'chat-app-realtime',
    description: 'Ứng dụng chat realtime hỗ trợ phòng chat, tin nhắn riêng và chia sẻ file.',
    content: `## Giới thiệu

Ứng dụng nhắn tin realtime sử dụng **Socket.IO** với giao diện hiện đại.

## Tính năng

- 💬 Chat cá nhân & nhóm realtime
- 📁 Chia sẻ file, hình ảnh
- 🟢 Trạng thái online/offline
- 🔔 Thông báo tin nhắn mới
- 😀 Emoji picker
- 🔒 Mã hóa end-to-end

## Tech Stack

- **Frontend:** React, Socket.IO Client, Tailwind CSS
- **Backend:** Node.js, Socket.IO, Express
- **Database:** MongoDB (messages), Redis (sessions)
- **Storage:** Cloudinary (file upload)

## Demo

| Tính năng | Mô tả |
|-----------|-------|
| Realtime | < 100ms latency |
| File size | Tối đa 10MB |
| Rooms | Không giới hạn |`,
    thumbnail: '/public/defaults/default-thumbnail.svg',
    techStack: ['React', 'Socket.IO', 'Node.js', 'MongoDB', 'Redis'],
    liveUrl: '',
    repoUrl: 'https://github.com/LeCongQuocDuy1',
    order: 3,
  },
  {
    title: 'Task Management App',
    slug: 'task-management-app',
    description: 'Ứng dụng quản lý công việc theo phong cách Kanban với drag & drop và cộng tác nhóm.',
    content: `## Giới thiệu

Ứng dụng quản lý công việc lấy cảm hứng từ **Trello** và **Jira**, tập trung vào trải nghiệm người dùng.

## Tính năng

- 📋 Kanban board với drag & drop
- 👥 Cộng tác nhóm realtime
- 📅 Deadline & reminder
- 🏷️ Label, priority phân loại task
- 📈 Báo cáo tiến độ theo sprint
- 🔗 Tích hợp GitHub (liên kết commit với task)

## Tech Stack

- **Frontend:** React, @dnd-kit, React Query, Tailwind CSS
- **Backend:** NestJS, TypeScript, WebSocket
- **Database:** PostgreSQL, TypeORM
- **Auth:** OAuth2 (Google, GitHub)

## Cài đặt

\`\`\`bash
npm install
cp .env.example .env
npm run db:migrate
npm run dev
\`\`\``,
    thumbnail: '/public/defaults/default-thumbnail.svg',
    techStack: ['React', 'NestJS', 'PostgreSQL', 'TypeORM', 'WebSocket'],
    liveUrl: '',
    repoUrl: 'https://github.com/LeCongQuocDuy1',
    order: 4,
  },
];

async function main() {
  console.log('Seeding projects...');
  for (const p of projects) {
    const existing = await prisma.project.findUnique({ where: { slug: p.slug } });
    if (existing) {
      console.log(`  skip: ${p.slug} (already exists)`);
      continue;
    }
    await prisma.project.create({ data: p });
    console.log(`  created: ${p.slug}`);
  }
  console.log('Done!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
