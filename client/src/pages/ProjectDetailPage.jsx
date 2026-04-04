import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useProject } from '../hooks/useProjects';
import './ProjectDetailPage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { data: project, isLoading, isError } = useProject(slug);

    if (isLoading) return <ProjectDetailSkeleton />;

    if (isError || !project) {
        return (
            <div className="pdetail-error">
                <div className="pdetail-error__code">404</div>
                <h2 className="pdetail-error__title">Không tìm thấy dự án</h2>
                <p className="pdetail-error__sub">Dự án này không tồn tại hoặc đã bị xóa.</p>
                <Link to="/" className="pdetail-back-btn">← Về trang chủ</Link>
            </div>
        );
    }

    return (
        <div className="pdetail">
            {/* NAV */}
            <nav className="pdetail-nav">
                <div className="pdetail-nav__inner">
                    <button onClick={() => navigate(-1)} className="pdetail-nav__back">
                        <i className="bx bx-arrow-back"></i> Quay lại
                    </button>
                    <Link to="/" className="pdetail-nav__home">Trang chủ</Link>
                </div>
            </nav>

            {/* HERO */}
            <div className="pdetail-hero">
                <div className="pdetail-hero__img-wrap">
                    <img
                        src={project.thumbnail?.startsWith('http') ? project.thumbnail : `${API_URL}${project.thumbnail}`}
                        alt={project.title}
                        className="pdetail-hero__img"
                    />
                    <div className="pdetail-hero__gradient" />
                </div>

                <div className="pdetail-hero__content container">
                    <div className="pdetail-hero__stack">
                        {project.techStack.map((t) => (
                            <span key={t} className="pdetail-tag">{t}</span>
                        ))}
                    </div>
                    <h1 className="pdetail-hero__title">{project.title}</h1>
                    <p className="pdetail-hero__desc">{project.description}</p>

                    <div className="pdetail-hero__links">
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pdetail-btn pdetail-btn--primary">
                                <i className="bx bx-link-external"></i> Xem Live
                            </a>
                        )}
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="pdetail-btn pdetail-btn--ghost">
                                <i className="bx bxl-github"></i> Source Code
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="pdetail-body container">
                <div className="pdetail-content prose">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {project.content}
                    </ReactMarkdown>
                </div>

                {/* SIDEBAR */}
                <aside className="pdetail-sidebar">
                    <div className="pdetail-sidebar__card">
                        <h3 className="pdetail-sidebar__title">Tech Stack</h3>
                        <div className="pdetail-sidebar__tags">
                            {project.techStack.map((t) => (
                                <span key={t} className="pdetail-tag">{t}</span>
                            ))}
                        </div>
                    </div>

                    {(project.liveUrl || project.repoUrl) && (
                        <div className="pdetail-sidebar__card">
                            <h3 className="pdetail-sidebar__title">Links</h3>
                            <div className="pdetail-sidebar__links">
                                {project.liveUrl && (
                                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="pdetail-sidebar__link">
                                        <i className="bx bx-link-external"></i>
                                        <span>Live Demo</span>
                                        <i className="bx bx-chevron-right" style={{ marginLeft: 'auto' }}></i>
                                    </a>
                                )}
                                {project.repoUrl && (
                                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="pdetail-sidebar__link">
                                        <i className="bx bxl-github"></i>
                                        <span>GitHub Repo</span>
                                        <i className="bx bx-chevron-right" style={{ marginLeft: 'auto' }}></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <Link to="/" className="pdetail-back-btn">
                        ← Về trang chủ
                    </Link>
                </aside>
            </div>
        </div>
    );
}

function ProjectDetailSkeleton() {
    return (
        <div className="pdetail">
            <div className="pdetail-skeleton__hero" />
            <div className="pdetail-body container">
                <div className="pdetail-content">
                    {[100, 70, 90, 60, 80, 50].map((w, i) => (
                        <div key={i} className="pdetail-skeleton__line" style={{ width: `${w}%`, marginBottom: i === 2 ? '1.5rem' : '0.6rem' }} />
                    ))}
                </div>
                <aside className="pdetail-sidebar">
                    <div className="pdetail-skeleton__card" />
                </aside>
            </div>
        </div>
    );
}
