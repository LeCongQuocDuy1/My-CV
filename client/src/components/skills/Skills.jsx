import Backend from "./Backend";
import Frontend from "./Frontend";
import './Skills.css';

function Skills() {
    return (
        <section className="section skills" id="skills">
            <h2 className="section__title">My Skills</h2>
            <span className="section__subtitle">My Technical Level</span>

            <div className="skills__container container grid">
                <Frontend />

                <Backend />
            </div>
        </section>
    );
}

export default Skills;