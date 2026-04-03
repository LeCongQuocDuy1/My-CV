import './Service.css';
import { useState } from 'react';

const Services = () => {
    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    }

    return (
        <section className="services section" id="services">
            <h2 className="section__title">Services</h2>
            <span className="section__subtitle">What I Offer</span>

            <div className="services__container container grid">
                <div className="services__content">
                    <i className="uil uil-web-grid services__icon"></i>
                    <h3 className="services__title">Frontend <br /> Developer</h3>

                    <span className="services__button" onClick={() => toggleTab(1)}>View more <i className="uil uil-arrow-right services__button-icon"></i></span>

                    <div className={toggleState === 1 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></i>

                            <h3 className="services__modal-title">Frontend Developer</h3>
                            <p className="services__modal-description">
                                Front-end web development, also known as client-side development is the practice of producing HTML, CSS and JavaScript for a website or Web Application so that a user can see and interact with them directly.
                            </p>
                            <ul className="services__modal-services grid">
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Optimizing the user experience.</p>
                                </li>
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Using HTML, JavaScript and CSS to bring concepts to life.</p>
                                </li>
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Developing and maintaining the user interface.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="services__content">
                    <i className="uil uil-arrow services__icon"></i>
                    <h3 className="services__title">ReactJS <br /> Developer</h3>

                    <span className="services__button" onClick={() => toggleTab(2)}>View more <i className="uil uil-arrow-right"></i></span>

                    <div className={toggleState === 2 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></i>

                            <h3 className="services__modal-title">ReactJS Developer</h3>
                            <p className="services__modal-description">
                                React developers are software professionals who work with React to build UIs. By association, React developers are also front-end developers as well as JavaScript developers.
                            </p>
                            <ul className="services__modal-services grid">
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Build web applications or use React Native to develop mobile apps on the client-side of development.</p>
                                </li>
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Developing responsive interactive technology for dynamic web pages such as menu buttons, online forms, gesture-driven actions, etc.</p>
                                </li>
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Consulting with back-end engineers and developers to ensure that collaborative user-facing and server-side interactions run without error</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="services__content">
                    <i className="uil uil-edit services__icon"></i>
                    <h3 className="services__title">Fullstack <br /> Developer</h3>

                    <span className="services__button" onClick={() => toggleTab(3)}>View more <i className="uil uil-arrow-right"></i></span>

                    <div className={toggleState === 3 ? "services__modal active-modal" : "services__modal"}>
                        <div className="services__modal-content">
                            <i className="uil uil-times services__modal-close" onClick={() => toggleTab(0)}></i>

                            <h3 className="services__modal-title">Fullstack Developer</h3>
                            <p className="services__modal-description">
                                A full-stack developer is a developer or engineer who can build both the front end and the back end of a website. The front end (the parts of a website a user sees and interacts with) and the back end (the behind-the-scenes data storage and processing) require different skill sets.
                            </p>
                            <ul className="services__modal-services grid">
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Develop and maintain web services and interfaces</p>
                                </li>
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Contribute to front-end and back-end development processes</p>
                                </li>
                                <li className="services__modal-service">
                                    <i className="uil uil-check-circle services__modal-icon"></i>
                                    <p className="services__modal-info">Build new product features or APIs and Perform tests, troubleshoot software, and fix bugs</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;