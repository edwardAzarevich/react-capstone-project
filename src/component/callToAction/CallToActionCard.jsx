const CallToActionCard = () => {
    return (
        <div className="CallToActionCard">
            <h1 className="cta-title">Little Lemon</h1>
            <h3 className="cta-subtitle">Chicago</h3>
            <p className="cta-text">
                We are a family owned Mediterranean<br />
                restaurant, focused on traditional recipes<br />
                served with a modern twist.
            </p>
            <div className="cta-cta-wrap">
                <a href="/reservations" className="cta-link">
                    <button className="special-button">Reserve a Table</button>
                </a>
            </div>
        </div>
    );
};

export default CallToActionCard;
