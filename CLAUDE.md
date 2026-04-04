# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Start dev server (localhost:3000)
npm run build    # Production build
npm test         # Run Jest tests
npm run deploy   # Build + deploy to GitHub Pages (gh-pages)
```

## Architecture

Single-page React portfolio/CV app bootstrapped with Create React App. No routing library — navigation uses anchor hash links (`#home`, `#about`, etc.).

**Component layout** (`src/App.js`): Linear stack of section components rendered inside a `.main` div:
`Header → Home → About → Skills → Services → Qualification → Testimonials → Contact → Footer`

Each component lives in `src/components/<Name>/` with its own `.jsx` and `.css` file.

**State**: Local `useState` only — no global state (no Redux/Context). Components with state:

-   `Header` — mobile menu toggle (`showMenu`)
-   `Services`, `Qualification` — tab/toggle switching (`toggleState`)
-   `Testimonials` — Swiper carousel via `useRef`

**Styling**: Plain CSS per component + global variables in `src/App.css`. Design tokens (colors, spacing, font sizes) are CSS custom properties. Responsive breakpoints: 992px, 768px, 576px, 350px. Icons via Boxicons and Unicons loaded from CDN in `public/index.html`.

**Email**: Contact form uses EmailJS (`@emailjs/browser`). Service/template IDs are hardcoded in `Contact.jsx`.

**Deployment**: GitHub Pages via `gh-pages`. `PUBLIC_URL="."` in `.env` ensures relative asset paths work correctly on the subdirectory deployment.

**Key libraries**: Swiper 8 (testimonials carousel), EmailJS (contact form), react-scripts 5 (CRA toolchain).

## 🎯 CORE FEATURES & LOGIC (CHỐT)

-   **Backend First:** Xây dựng hệ thống API hoàn chỉnh trước khi làm Frontend.
-   **Project Detail:** Mỗi dự án có một trang chi tiết riêng (`/projects/[slug]`).
-   **Rich Content:** Nội dung dự án được nhập bằng Markdown/HTML, lưu vào trường `content` trong DB và render đẹp bằng Tailwind Typography (`prose`).
-   **Image Management:** Thumbnail phải được upload trực tiếp từ máy tính lên Server (không dùng URL thuần). Phải có logic xóa file vật lý khi xóa/update dự án.
-   **Admin Dashboard:** Chỉ dành cho chủ sở hữu, dùng JWT để bảo mật các hành động Thêm/Sửa/Xóa.
-   **Contact Form:** Gửi email thực sự qua Resend/Nodemailer khi có người liên hệ (không cần lưu DB).
-   **Public Site:** Trang chủ fetch dữ liệu từ API để render slide dự án.

## Development Roadmap

🚀 DEVELOPMENT ROADMAP (CHECKLIST)
🟢 SPRINT 1: BACKEND INFRASTRUCTURE
[x] 1.1. Khởi tạo dự án Express + TypeScript trong thư mục /server.

[x] 1.2. Cấu hình Prisma & thiết lập Schema (Bảng Account và Project).

[x] 1.3. Kết nối Database (Neon/Postgres) và chạy migration.

[x] 1.4. Thiết lập Global Error Middleware và Zod Validation.

🟡 SPRINT 2: AUTHENTICATION & SECURITY
[x] 2.1. Viết logic Hash mật khẩu (Bcrypt) và tạo tài khoản Admin đầu tiên.

[x] 2.2. Viết API Login /api/auth/login (Trả về JWT Token).

[x] 2.3. Viết Middleware isAuthenticated để bảo vệ các route nội bộ.

🟠 SPRINT 3: PROJECT MANAGEMENT (CRUD)
[x] 3.1. Cấu hình Multer để xử lý Upload ảnh Thumbnail.

[x] 3.2. Viết API POST /api/projects (Tạo dự án mới kèm upload ảnh).

[x] 3.3. Viết API PUT /api/projects/:id (Cập nhật dự án + Xóa ảnh cũ nếu đổi ảnh).

[x] 3.4. Viết API DELETE /api/projects/:id (Xóa dự án + Xóa file ảnh vật lý).

[x] 3.5. Viết API Public: GET /api/projects (List) và GET /api/projects/:slug (Detail).

🔵 SPRINT 4: FRONTEND INTEGRATION & ADMIN UI
[x] 4.1. Cài đặt React Query và thiết lập fetch dữ liệu từ API Backend.

[ ] 4.2. Xây dựng trang Admin Dashboard đơn giản (Login, List, Form Add/Edit).

[ ] 4.3. Tích hợp Markdown Editor (Textarea) và Preview cho phần nội dung chi tiết.

[ ] 4.4. Cập nhật trang chủ (Slide dự án) gọi dữ liệu từ API thay vì fix cứng.

[ ] 4.5. Tạo trang chi tiết /projects/[slug] dùng Tailwind Typography (prose).

📧 SPRINT 5: CONTACT & FINAL POLISH
[ ] 5.1. Viết API /api/contact tích hợp Resend để gửi mail thông báo.

[ ] 5.2. Thêm hiệu ứng Skeleton Loading và Toast Notifications (sonner).

[ ] 5.3. Kiểm tra bảo mật (CORS, Rate Limit) và tối ưu hóa SEO.
