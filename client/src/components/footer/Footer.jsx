import { useLanguage } from '../../context/LanguageContext';
import './footer.css';

function Footer() {
    const { t } = useLanguage();
    const f = t.footer;

    return (
        <footer className="footer">
            <div className="footer__container container">
                <h1 className="footer__title">Quoc Duy</h1>

                <ul className="footer__list">
                    <li>
                        <a href="#about" className='footer__link'>{f.about}</a>
                    </li>
                    <li>
                        <a href="#portfolio" className='footer__link'>{f.project}</a>
                    </li>
                    <li>
                        <a href="#testimonials" className='footer__link'>{f.testimonials}</a>
                    </li>
                </ul>

                <div className="footer__social">
                    <a href="https://www.facebook.com/helianthusanuus1003" className="footer__social-link" target="_blank" rel="noreferrer">
                        <i className="uil uil-facebook"></i>
                    </a>
                    <a href="https://www.google.com/intl/vi/gmail/about/" className="footer__social-link" target="_blank" rel="noreferrer">
                        <i className="uil uil-envelope-alt"></i>
                    </a>
                    <a href="https://github.com/HelianthusAnnuus1003" className="footer__social-link" target="_blank" rel="noreferrer">
                        <i className="uil uil-github"></i>
                    </a>
                </div>

                <span className="footer__copyright">{f.copyright}</span>
            </div>
        </footer>
    );
}

export default Footer;
