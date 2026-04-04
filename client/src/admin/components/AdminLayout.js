import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../admin.css';

const NAV_ITEMS = [
  { to: '/admin', end: true, icon: '▦', label: 'Tổng quan' },
  { to: '/admin/projects/new', icon: '+', label: 'Thêm dự án' },
];

export default function AdminLayout({ children }) {
  const { account, logout } = useAuth();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  const DEFAULT_AVATAR = 'https://res.cloudinary.com/quocduy/image/upload/my-cv/default-avatar';
  const avatarSrc = account?.avatar || DEFAULT_AVATAR;

  return (
    <div className="admin-root admin-layout">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* MOBILE TOPBAR */}
      <div className="admin-topbar">
        <button className="admin-topbar__menu" onClick={() => setSidebarOpen(true)}>☰</button>
        <div className="admin-topbar__logo">⚡ My CV Admin</div>
        <img className="admin-topbar__avatar" src={avatarSrc} alt="avatar" />
      </div>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar${sidebarOpen ? ' admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__header">
          <div className="admin-sidebar__logo">
            <div className="admin-sidebar__logo-icon">⚡</div>
            <span>My CV Admin</span>
          </div>
          <button className="admin-sidebar__close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>

        <div className="admin-sidebar__section-label">Menu</div>
        <nav className="admin-sidebar__nav">
          {NAV_ITEMS.map(({ to, end, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-sidebar__link${isActive ? ' active' : ''}`
              }
            >
              <span style={{ fontSize: '1rem', width: 18, textAlign: 'center' }}>{icon}</span>
              {label}
            </NavLink>
          ))}

          <div className="admin-sidebar__divider" />

          <a href="/" className="admin-sidebar__link" target="_blank" rel="noreferrer">
            <span style={{ fontSize: '1rem', width: 18, textAlign: 'center' }}>↗</span>
            Xem trang chủ
          </a>
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <img className="admin-sidebar__user-avatar" src={avatarSrc} alt="avatar" />
            <div className="admin-sidebar__user-info">
              <div className="admin-sidebar__user-name">Admin</div>
              <div className="admin-sidebar__user-email">{account?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="admin-sidebar__logout"
            style={{ marginTop: '0.625rem', width: '100%', textAlign: 'left', padding: '0.4rem 0' }}
          >
            ← Đăng xuất
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="admin-content">{children}</main>
    </div>
  );
}
