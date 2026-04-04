🚀 Full-stack Portfolio & CMS (2026 Edition)
Đây là dự án Portfolio cá nhân được xây dựng với tư duy Product-Oriented. Không chỉ là một trang giới thiệu bản thân tĩnh, hệ thống tích hợp một CMS (Content Management System) thu nhỏ cho phép quản lý dự án, nội dung Markdown và lưu trữ hình ảnh thực tế.

✨ Tính năng nổi bật
🎨 Frontend (Client)
Modern UI/UX: Xây dựng trên Next.js 15, Tailwind CSS và hiệu ứng mượt mà từ Framer Motion.

Dynamic Content: Hiển thị danh sách dự án thời gian thực từ Backend API.

Project Showcase: Trang chi tiết dự án hỗ trợ render Markdown chuyên nghiệp với @tailwindcss/typography.

Responsive: Tối ưu hóa hoàn toàn cho mọi thiết bị (Mobile, Tablet, Desktop).

⚙️ Backend (Server)
RESTful API: Hệ thống API sạch sẽ, bảo mật với Node.js & TypeScript.

Secure Auth: Quản lý truy cập Admin bằng JWT và mã hóa mật khẩu Bcrypt.

Data Integrity: Xác thực dữ liệu đầu vào bằng Zod Validation.

Media Handling: Quản lý upload hình ảnh qua Multer với logic tự động dọn dẹp file vật lý trên server.

Database: Sử dụng PostgreSQL (Neon.tech) cùng Prisma ORM để quản lý quan hệ dữ liệu chặt chẽ.

🏗 Cấu trúc thư mục
Plaintext
.
├── client/           # Next.js Frontend (React, Framer Motion, Tailwind)
├── server/           # Express Backend (TypeScript, Prisma, JWT)
├── CLAUDE.md         # Quy tắc phát triển và Roadmap dự án
└── README.md         # Tài liệu hướng dẫn này
🛠 Hướng dẫn cài đặt
1. Yêu cầu hệ thống
Node.js 18+

PostgreSQL (Hoặc tài khoản Neon.tech)

2. Thiết lập Backend
Bash
cd server
npm install
# Tạo file .env dựa trên .env.example và điền DATABASE_URL, JWT_SECRET
npx prisma migrate dev
npm run dev
3. Thiết lập Frontend
Bash
cd client
npm install
# Tạo file .env và điền NEXT_PUBLIC_API_URL
npm run dev
🔒 Bảo mật & Tối ưu
XSS Protection: Mọi nội dung Markdown đều được sanitize trước khi render.

Rate Limiting: Chống spam cho các endpoint nhạy cảm (Login, Contact).

Atomic Commits: Lịch sử Git được quản lý theo chuẩn Conventional Commits.

📬 Liên hệ
Nếu bạn có bất kỳ câu hỏi nào về dự án, đừng ngần ngại liên hệ với tôi qua:

Email: [Email của bạn]

GitHub: [@username của bạn]

Website: [Tên miền dự án của bạn]

Dự án được phát triển với sự hỗ trợ từ Claude Code theo phong cách Vibe Coding 2026.
