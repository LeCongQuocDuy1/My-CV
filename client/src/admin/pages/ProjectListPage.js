import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import api from '../../lib/axios';
import AdminLayout from '../components/AdminLayout';
import '../admin.css';

export default function ProjectListPage() {
  const queryClient = useQueryClient();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  function getThumbSrc(thumbnail) {
    if (!thumbnail) return '/default-thumbnail.svg';
    if (thumbnail.startsWith('http')) return thumbnail;
    return `${apiUrl}${thumbnail}`;
  }
  const [deletingId, setDeletingId] = useState(null);

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => {
      const { data } = await api.get('/api/projects');
      return data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success('Đã xóa dự án thành công!');
    },
    onError: () => toast.error('Xóa thất bại, vui lòng thử lại.'),
  });

  function handleDelete(project) {
    if (!window.confirm(`Xóa dự án "${project.title}"?\nHành động này không thể hoàn tác.`)) return;
    setDeletingId(project.id);
    deleteMutation.mutate(project.id, { onSettled: () => setDeletingId(null) });
  }

  const totalTech = [...new Set(projects.flatMap((p) => p.techStack))].length;

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h1 className="admin-page-title">Dự án</h1>
          <p className="admin-page-subtitle">Quản lý toàn bộ dự án của bạn</p>
        </div>
        <Link to="/admin/projects/new" className="admin-btn admin-btn--primary">
          + Thêm dự án
        </Link>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--purple">📁</div>
          <div>
            <div className="admin-stat-card__value">{projects.length}</div>
            <div className="admin-stat-card__label">Tổng dự án</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--blue">🔧</div>
          <div>
            <div className="admin-stat-card__value">{totalTech}</div>
            <div className="admin-stat-card__label">Công nghệ đã dùng</div>
          </div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-card__icon admin-stat-card__icon--green">🌐</div>
          <div>
            <div className="admin-stat-card__value">{projects.filter((p) => p.liveUrl).length}</div>
            <div className="admin-stat-card__label">Đã deploy</div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="admin-table-wrap">
        <div className="admin-table-header">
          <span className="admin-table-title">Danh sách dự án</span>
          <span className="admin-table-count">{projects.length} dự án</span>
        </div>

        {isLoading ? (
          <div style={{ padding: '1.5rem' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} className="admin-skeleton" style={{ height: 60, marginBottom: 8, borderRadius: 8 }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty__icon">📭</div>
            <div className="admin-empty__text">
              Chưa có dự án nào.{' '}
              <Link to="/admin/projects/new" className="admin-empty__link">Thêm ngay →</Link>
            </div>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Tên dự án</th>
                <th>Tech Stack</th>
                <th style={{ width: 60, textAlign: 'center' }}>Thứ tự</th>
                <th style={{ width: 60, textAlign: 'center' }}>Live</th>
                <th style={{ width: 140 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td>
                    <img
                      className="admin-table__thumb"
                      src={getThumbSrc(p.thumbnail)}
                      alt={p.title}
                    />
                  </td>
                  <td>
                    <div className="admin-table__title">{p.title}</div>
                    <div className="admin-table__slug">/{p.slug}</div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {p.techStack.slice(0, 4).map((t) => (
                        <span key={t} className="admin-badge">{t}</span>
                      ))}
                      {p.techStack.length > 4 && (
                        <span className="admin-badge">+{p.techStack.length - 4}</span>
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{p.order}</td>
                  <td style={{ textAlign: 'center' }}>
                    {p.liveUrl
                      ? <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontSize: '1.1rem' }}>✓</a>
                      : <span style={{ color: 'var(--text-muted)' }}>—</span>
                    }
                  </td>
                  <td>
                    <div className="admin-table__actions">
                      <Link
                        to={`/admin/projects/${p.id}/edit`}
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                      >
                        Sửa
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => handleDelete(p)}
                        disabled={deletingId === p.id}
                      >
                        {deletingId === p.id ? '...' : 'Xóa'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
