import Backend from "./Backend";
import Frontend from "./Frontend";
import { useLanguage } from '../../context/LanguageContext';
import './Skills.css';

function Skills() {
    const { t } = useLanguage();

    return (
        <section className="section skills" id="skills">
            <h2 className="section__title" data-aos="fade-up">{t.skills.title}</h2>
            <span className="section__subtitle" data-aos="fade-up" data-aos-delay="100">{t.skills.subtitle}</span>

            <div className="skills__container container grid">
                <Frontend t={t} />
                <Backend t={t} />
            </div>
        </section>
    );
}

export default Skills;
