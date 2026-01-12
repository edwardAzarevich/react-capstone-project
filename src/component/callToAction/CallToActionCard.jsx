const CallToActionCard = () => {
    return (
        <div className='CallToActionCard'>
            <h1 style={{ color: '#F4CE14' }}>Little Lemon</h1>
            <h3 style={{ color: '#EDEFEE' }}>Chicago</h3>
            <p style={{ color: '#EDEFEE' }}>
                We are a family owned Mediterranean<br />
                restaurant, focused on traditional recipes<br />
                served with a modern twist.</p>
            <div style={{ width: '200px', marginTop: '50px', marginBottom: '10px' }}>
                <button className="special-button">Reserve a Table</button>
            </div>
        </div>
    );
};

export default CallToActionCard;
