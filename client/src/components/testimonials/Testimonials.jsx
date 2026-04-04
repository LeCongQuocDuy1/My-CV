import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import { Pagination } from 'swiper';
import { useProjects } from '../../hooks/useProjects';
import { useLanguage } from '../../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/pagination';
import './testimonials.css';

SwiperCore.use([Autoplay]);

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function getThumbnailSrc(thumbnail) {
    if (!thumbnail) return '/default-thumbnail.svg';
    if (thumbnail.startsWith('http')) return thumbnail;
    return `${API_URL}${thumbnail}`;
}

function ProjectCard({ project, t }) {
    return (
        <div className="project__card">
            {/* Entire image area is a link */}
            <Link to={`/projects/${project.slug}`} className="project__card-img-wrap">
                <img
                    src={getThumbnailSrc(project.thumbnail)}
                    alt={project.title}
                    className="project__card-img"
                />
                <div className="project__card-overlay">
                    <span className="project__card-btn">{t.portfolio.viewDetail}</span>
                </div>
            </Link>

            <div className="project__card-body">
                <h3 className="project__card-title">{project.title}</h3>
                <p className="project__card-desc">{project.description}</p>

                <div className="project__card-stack">
                    {project.techStack.slice(0, 4).map((tech) => (
                        <span key={tech} className="project__card-tag">{tech}</span>
                    ))}
                    {project.techStack.length > 4 && (
                        <span className="project__card-tag">+{project.techStack.length - 4}</span>
                    )}
                </div>

                <div className="project__card-links">
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project__card-link">
                            <i className="bx bx-link-external"></i> {t.portfolio.live}
                        </a>
                    )}
                    {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="project__card-link">
                            <i className="bx bxl-github"></i> {t.portfolio.code}
                        </a>
                    )}
                    <Link to={`/projects/${project.slug}`} className="project__card-link project__card-link--detail">
                        {t.portfolio.detail} <i className="bx bx-right-arrow-alt"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function SkeletonCard() {
    return (
        <div className="project__card project__card--skeleton">
            <div className="project__skeleton project__skeleton--img" />
            <div className="project__card-body">
                <div className="project__skeleton project__skeleton--title" />
                <div className="project__skeleton project__skeleton--text" />
                <div className="project__skeleton project__skeleton--text" style={{ width: '60%' }} />
            </div>
        </div>
    );
}

function Testimonials() {
    const { data: projects = [], isLoading, isError } = useProjects();
    const { t } = useLanguage();

    return (
        <section className="section projects container" id="portfolio">
            <h2 className="section__title" data-aos="fade-up">{t.portfolio.title}</h2>
            <span className="section__subtitle" data-aos="fade-up" data-aos-delay="100">{t.portfolio.subtitle}</span>

            {isError && (
                <p style={{ textAlign: 'center', color: 'var(--text-color-light)', marginTop: '1rem' }}>
                    {t.portfolio.error}
                </p>
            )}

            {isLoading ? (
                <div className="projects__skeleton-grid">
                    {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
                </div>
            ) : projects.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-color-light)', marginTop: '2rem' }}>
                    {t.portfolio.empty}
                </p>
            ) : (
                <Swiper
                    className="projects__container"
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    loop={projects.length > 2}
                    grabCursor={true}
                    spaceBetween={24}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        576: { slidesPerView: 1 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 28 },
                    }}
                    modules={[Pagination]}
                >
                    {projects.map((p) => (
                        <SwiperSlide key={p.id}>
                            <ProjectCard project={p} t={t} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </section>
    );
}

export default Testimonials;
