import './Footer.css'; // Создайте этот файл для стилей

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Doormat Navigation */}
                    <div className="footer-section">
                        <h3 className="footer-title">Doormat Navigation</h3>
                        <nav>
                            <ul className="footer-list">
                                <li className="footer-item">
                                    <a href="#home" className="footer-link">
                                        Home
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="#about" className="footer-link">
                                        About
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="#menu" className="footer-link">
                                        Menu
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="#order" className="footer-link">
                                        Order Online
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="#reservation" className="footer-link">
                                        Reservation
                                    </a>
                                </li>
                                <li className="footer-item">
                                    <a href="#login" className="footer-link">
                                        Login
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Contacts */}
                    <div className="footer-section">
                        <h3 className="footer-title">Contacts</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="#address" className="footer-link">
                                    Address
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="tel:+1234567890" className="footer-link">
                                    Phone Number
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="mailto:info@example.com" className="footer-link">
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Links */}
                    <div className="footer-section">
                        <h3 className="footer-title">Social Media Links</h3>
                        <ul className="footer-list">
                            <li className="footer-item">
                                <a href="#facebook" className="footer-link">
                                    Facebook
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="#instagram" className="footer-link">
                                    Instagram
                                </a>
                            </li>
                            <li className="footer-item">
                                <a href="#twitter" className="footer-link">
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
