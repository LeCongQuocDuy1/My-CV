import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../lib/axios';
import { toast } from 'sonner';
import AdminLayout from '../components/AdminLayout';
import MarkdownEditor from '../components/MarkdownEditor';
import '../admin.css';

const EMPTY_FORM = {
  title: '', slug: '', description: '', content: '',
  techStack: '', liveUrl: '', repoUrl: '',
};

function toSlug(str) {
  return str.toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export default function ProjectFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const [form, setForm] = useState(EMPTY_FORM);
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');

  const { data: projects = [] } = useQuery({
    queryKey: ['admin-projects'],
    queryFn: async () => { const { data } = await api.get('/api/projects'); return data; },
    enabled: isEdit,
  });

  useEffect(() => {
    if (!isEdit) return;
    const project = projects.find((p) => String(p.id) === String(id));
    if (!project) return;
    api.get(`/api/projects/${project.slug}`).then(({ data }) => {
      setForm({
        title: data.title, slug: data.slug,
        description: data.description, content: data.content,
        techStack: data.techStack.join(', '),
        liveUrl: data.liveUrl || '', repoUrl: data.repoUrl || '',
      });
      const thumb = data.thumbnail;
      setPreview(!thumb ? '' : thumb.startsWith('http') ? thumb : `${apiUrl}${thumb}`);
    });
  }, [isEdit, id, projects, apiUrl]);

  const mutation = useMutation({
    mutationFn: (formData) => {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      return isEdit
        ? api.put(`/api/projects/${id}`, formData, config)
        : api.post('/api/projects', formData, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-projects'] });
      toast.success(isEdit ? 'Cập nhật dự án thành công!' : 'Tạo dự án thành công!');
      navigate('/admin');
    },
    onError: (err) => {
      const msg = err.response?.data?.error || err.response?.data?.details?.[0]?.message || 'Có lỗi xảy ra';
      setError(msg);
      toast.error(msg);
    },
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'title' && !isEdit) next.slug = toSlug(value);
      return next;
    });
  }

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (thumbnail) fd.append('thumbnail', thumbnail);
    mutation.mutate(fd);
  }

  return (
    <AdminLayout>
      <div className="admin-page-header">
        <div className="admin-page-header__left">
          <h1 className="admin-page-title">{isEdit ? 'Chỉnh sửa dự án' : 'Thêm dự án mới'}</h1>
          <p className="admin-page-subtitle">
            {isEdit ? 'Cập nhật thông tin dự án' : 'Điền thông tin để tạo dự án mới'}
          </p>
        </div>
        <button onClick={() => navigate('/admin')} className="admin-btn admin-btn--ghost">
          ← Quay lại
        </button>
      </div>

      <div className="admin-form-card">
        <div className="admin-form-card__header">
          <div className="admin-form-card__title">
            {isEdit ? '✏️ Thông tin dự án' : '📝 Thông tin dự án'}
          </div>
        </div>

        <div className="admin-form-card__body">
          {error && (
            <div className="admin-login__error" style={{ marginBottom: '1.5rem' }}>
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Tên & Slug */}
            <div className="admin-form-row">
              <div className="admin-field">
                <label className="admin-label">Tên dự án *</label>
                <input
                  className="admin-input" name="title"
                  placeholder="My Awesome Project"
                  value={form.title} onChange={handleChange} required
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">Slug *</label>
                <input
                  className="admin-input" name="slug"
                  placeholder="my-awesome-project"
                  value={form.slug} onChange={handleChange} required
                />
              </div>
            </div>

            {/* Mô tả */}
            <div className="admin-field">
              <label className="admin-label">Mô tả ngắn *</label>
              <input
                className="admin-input" name="description"
                placeholder="Mô tả ngắn gọn về dự án..."
                value={form.description} onChange={handleChange} required
              />
            </div>

            {/* Tech Stack */}
            <div className="admin-field">
              <label className="admin-label">Tech Stack</label>
              <input
                className="admin-input" name="techStack"
                placeholder="React, TypeScript, Node.js"
                value={form.techStack} onChange={handleChange}
              />
            </div>

            {/* URLs */}
            <div className="admin-form-row">
              <div className="admin-field">
                <label className="admin-label">🌐 Live URL</label>
                <input
                  className="admin-input" name="liveUrl"
                  placeholder="https://myproject.com"
                  value={form.liveUrl} onChange={handleChange}
                />
              </div>
              <div className="admin-field">
                <label className="admin-label">GitHub Repo URL</label>
                <input
                  className="admin-input" name="repoUrl"
                  placeholder="https://github.com/user/repo"
                  value={form.repoUrl} onChange={handleChange}
                />
              </div>
            </div>

            <hr className="admin-form-divider" />

            {/* Content Markdown */}
            <div className="admin-field">
              <label className="admin-label">📄 Nội dung chi tiết (Markdown) *</label>
              <MarkdownEditor
                value={form.content}
                onChange={handleChange}
                placeholder={'## Giới thiệu\n\nMô tả chi tiết về dự án...\n\n## Tính năng\n\n- Feature 1\n- Feature 2'}
              />
              {/* Hidden input để đảm bảo required validation */}
              <input type="text" required value={form.content} onChange={() => {}} style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', height: 0 }} />
            </div>

            {/* Thumbnail */}
            <div className="admin-field">
              <label className="admin-label">🖼️ Thumbnail {isEdit && '(để trống = giữ ảnh cũ)'}</label>
              <div className="admin-file-input-wrap">
                <input type="file" accept="image/*" onChange={handleFile} />
                <div className="admin-file-input-wrap__text">
                  <span>Chọn ảnh</span> hoặc kéo thả vào đây
                  <br />
                  <small style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>PNG, JPG, WEBP — tối đa 5MB</small>
                </div>
              </div>
              {preview && (
                <div className="admin-file-preview">
                  <img src={preview} alt="preview" />
                  <div className="admin-file-preview__label">Preview thumbnail</div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="admin-form-actions">
              <button
                type="submit"
                className="admin-btn admin-btn--primary"
                disabled={mutation.isPending}
              >
                {mutation.isPending
                  ? '⏳ Đang lưu...'
                  : isEdit ? '✓ Cập nhật dự án' : '+ Tạo dự án'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="admin-btn admin-btn--ghost"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
