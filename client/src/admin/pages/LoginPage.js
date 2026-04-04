import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../lib/axios';
import '../admin.css';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', form);
      login(data.token, data.account);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Email hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-root admin-login">
      <div className="admin-login__card">
        <div className="admin-login__icon">⚡</div>
        <h1 className="admin-login__title">Chào mừng trở lại</h1>
        <p className="admin-login__sub">Đăng nhập vào Admin Dashboard</p>

        {error && (
          <div className="admin-login__error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="admin-field">
            <label className="admin-label">Email</label>
            <input
              className="admin-input"
              type="email"
              placeholder="admin@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
              required
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Mật khẩu</label>
            <input
              className="admin-input"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              autoComplete="current-password"
              required
            />
          </div>
          <button
            type="submit"
            className="admin-btn admin-btn--primary admin-btn--full"
            style={{ marginTop: '0.5rem' }}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập →'}
          </button>
        </form>
      </div>
    </div>
  );
}
