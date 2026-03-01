import React from 'react';
import './Confirm.css';

const ConfirmedBooking = ({ bookingDetails }) => {
    return (
        <section id='confirmed-booking'>
            <div className="msg">
                <p className="thanks-msg"><i>Thank you for your reservation at:</i></p>
                <h1>Little Lemon</h1>

                {bookingDetails && (
                    <div className="booking-details">
                        <h3>Booking Details:</h3>
                        <p><strong>Date:</strong> {bookingDetails.resDate}</p>
                        <p><strong>Time:</strong> {bookingDetails.resTime}</p>
                        <p><strong>Guests:</strong> {bookingDetails.guests}</p>
                        <p><strong>Occasion:</strong> {bookingDetails.occasion || 'Not specified'}</p>
                    </div>
                )}

                <p className="welcome-message">
                    We are looking forward to your visit and hope you will have the best dining experience with us!
                </p>

                <button
                    className="back-home-button"
                    onClick={() => window.location.href = '/'}
                >
                    Back to Home
                </button>
            </div>
        </section>
    );
};

export default ConfirmedBooking;
