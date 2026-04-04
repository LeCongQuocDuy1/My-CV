import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './header.css';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const { lang, toggleLang, t } = useLanguage();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    function toggleTheme() {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    }

    const nav = t.nav;

    return (
        <header className='header'>
            <nav className="nav container">
                <a href="index.html" className="nav__logo">Quoc Duy</a>

                <div className={showMenu ? "nav__menu show-menu" : "nav__menu"}>
                    <ul className="nav__list grid">
                        <li className="nav__item">
                            <a href="#home" className="nav__link" onClick={() => setShowMenu(false)}>
                                <i className="uil uil-estate nav__icon"></i> {nav.home}
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#about" className="nav__link" onClick={() => setShowMenu(false)}>
                                <i className="uil uil-user nav__icon"></i> {nav.about}
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#skills" className="nav__link" onClick={() => setShowMenu(false)}>
                                <i className="uil uil-file-alt nav__icon"></i> {nav.skills}
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#qualification" className="nav__link" onClick={() => setShowMenu(false)}>
                                <i className="uil uil-scenery nav__icon"></i> {nav.qualification}
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#portfolio" className="nav__link" onClick={() => setShowMenu(false)}>
                                <i className="uil uil-apps nav__icon"></i> {nav.portfolio}
                            </a>
                        </li>
                        <li className="nav__item">
                            <a href="#contact" className="nav__link" onClick={() => setShowMenu(false)}>
                                <i className="uil uil-message nav__icon"></i> {nav.contact}
                            </a>
                        </li>
                    </ul>

                    <i className="uil uil-times nav__close" onClick={() => setShowMenu(false)}></i>
                </div>

                <div className="nav__actions">
                    <button className="nav__action-btn" onClick={toggleLang} title="Switch language">
                        {lang === 'en' ? 'VI' : 'EN'}
                    </button>
                    <button className="nav__action-btn" onClick={toggleTheme} title="Toggle theme">
                        <i className={`uil ${theme === 'light' ? 'uil-moon' : 'uil-sun'}`}></i>
                    </button>
                    <div className="nav__toggle" onClick={() => setShowMenu(!showMenu)}>
                        <i className="uil uil-apps"></i>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
