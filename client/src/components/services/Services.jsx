import './Service.css';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Services = () => {
    const [toggleState, setToggleState] = useState(0);
    const { t } = useLanguage();
    const s = t.services;

    const toggleTab = (index) => setToggleState(index);

    return (
        <section className="services section" id="services">
            <h2 className="section__title" data-aos="fade-up">{s.title}</h2>
            <span className="section__subtitle" data-aos="fade-up" data-aos-delay="100">{s.subtitle}</span>

            <div className="services__container container grid">
                {/* Frontend */}
                <div className="services__content" data-aos="fade-up" data-aos-delay="100">
                    <i className="uil uil-web-grid services__icon"></i>
                    <h3 className="services__title">Frontend <br /> Developer</h3>
                    <span className="services__button" onClick={() => toggleTab(1)}>
                        {s.viewMore} <i className="uil uil-arrow-right services__button-icon"></i>
                    </span>
                    <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></i>
                            <h3 className="services__modal-title">{s.frontend.title}</h3>
                            <p className="services__modal-description">{s.frontend.description}</p>
                            <ul className="services__modal-services grid">
                                {s.frontend.items.map((item, i) => (
                                    <li key={i} className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ReactJS */}
                <div className="services__content" data-aos="fade-up" data-aos-delay="200">
                    <i className="uil uil-arrow services__icon"></i>
                    <h3 className="services__title">ReactJS <br /> Developer</h3>
                    <span className="services__button" onClick={() => toggleTab(2)}>
                        {s.viewMore} <i className="uil uil-arrow-right"></i>
                    </span>
                    <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></i>
                            <h3 className="services__modal-title">{s.react.title}</h3>
                            <p className="services__modal-description">{s.react.description}</p>
                            <ul className="services__modal-services grid">
                                {s.react.items.map((item, i) => (
                                    <li key={i} className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Fullstack */}
                <div className="services__content" data-aos="fade-up" data-aos-delay="300">
                    <i className="uil uil-edit services__icon"></i>
                    <h3 className="services__title">Fullstack <br /> Developer</h3>
                    <span className="services__button" onClick={() => toggleTab(3)}>
                        {s.viewMore} <i className="uil uil-arrow-right"></i>
                    </span>
                    <div className={toggleState === 3 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></i>
                            <h3 className="services__modal-title">{s.fullstack.title}</h3>
                            <p className="services__modal-description">{s.fullstack.description}</p>
                            <ul className="services__modal-services grid">
                                {s.fullstack.items.map((item, i) => (
                                    <li key={i} className="services__modal-service">
                                        <i className="uil uil-check-circle services__modal-icon"></i>
                                        <p className="services__modal-info">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
