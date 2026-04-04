import './qualification.css';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function QualItem({ item, left }) {
    if (left) {
        return (
            <div className="qualification__data">
                <div>
                    <h3 className="qualification__title">{item.title}</h3>
                    <span className="qualification__subtitle">{item.place}</span>
                    <div className="qualification__calender">
                        <i className="uil uil-calendar-alt"></i> {item.date}
                    </div>
                </div>
                <div>
                    <span className="qualification__rounder"></span>
                    <span className="qualification__line"></span>
                </div>
            </div>
        );
    }
    return (
        <div className="qualification__data">
            <div></div>
            <div>
                <span className="qualification__rounder"></span>
                <span className="qualification__line"></span>
            </div>
            <div>
                <h3 className="qualification__title">{item.title}</h3>
                <span className="qualification__subtitle">{item.place}</span>
                <div className="qualification__calender">
                    <i className="uil uil-calendar-alt"></i> {item.date}
                </div>
            </div>
        </div>
    );
}

function Qualification() {
    const [toggleState, setToggleState] = useState(1);
    const { t } = useLanguage();
    const q = t.qualification;

    return (
        <section className="qualification section" id="qualification">
            <h2 className="section__title" data-aos="fade-up">{q.title}</h2>
            <span className="section__subtitle" data-aos="fade-up" data-aos-delay="100">{q.subtitle}</span>

            <div className="qualification__container container">
                <div className="qualification__tabs" data-aos="fade-up" data-aos-delay="150">
                    <div
                        className={`qualification__button button--flex${toggleState === 1 ? ' qualification__active' : ''}`}
                        onClick={() => setToggleState(1)}
                    >
                        <i className="uil uil-graduation-cap qualification__icon"></i> {q.education}
                    </div>
                    <div
                        className={`qualification__button button--flex${toggleState === 2 ? ' qualification__active' : ''}`}
                        onClick={() => setToggleState(2)}
                    >
                        <i className="uil uil-briefcase-alt qualification__icon"></i> {q.experience}
                    </div>
                </div>

                <div className="qualification__sections">
                    <div className={toggleState === 1 ? "qualification__content qualification__content-active" : "qualification__content"}>
                        {q.edu.map((item, i) => (
                            <QualItem key={i} item={item} left={i % 2 === 0} />
                        ))}
                    </div>
                    <div className={toggleState === 2 ? "qualification__content qualification__content-active" : "qualification__content"}>
                        {q.exp.map((item, i) => (
                            <QualItem key={i} item={item} left={i % 2 === 0} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Qualification;
