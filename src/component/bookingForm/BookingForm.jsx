import { Formik, Field, Form, ErrorMessage } from "formik";
import "./bookingForm.css";
import { useState } from 'react';
import { fetchAPI, submitAPI } from '../../api/api';
import ConfirmedBooking from './ConfirmedBooking';

const BookingForm = () => {
    const initialValues = {
        resDate: "",
        resTime: "",
        guests: 1,
        occasion: "",
    };

    const [availableTimes, setAvailableTimes] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [bookingData, setBookingData] = useState(null);

    const updateAvailableTimes = (dateString) => {
        if (dateString && fetchAPI) {
            const date = new Date(dateString);
            const times = fetchAPI(date);
            setAvailableTimes(times);
        } else {
            setAvailableTimes([]);
        }
    };

    const onSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("send:", values);

        if (submitAPI) {
            const success = submitAPI(values);
            if (success) {
                setBookingData(values);
                setIsSubmitted(true);
                setAvailableTimes([]);
            }
        }
    };

    if (isSubmitted) {
        return <ConfirmedBooking bookingDetails={bookingData} />;
    }

    return (
        <div className="booking-container">
            <div className="booking-card">
                <header className="booking-header">Book Now</header>

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form className="booking-form">
                            <label htmlFor="res-date" className="form-label">
                                Choose date
                            </label>
                            <Field
                                as="input"
                                type="date"
                                id="res-date"
                                name="resDate"
                                value={values.resDate}
                                className="form-input"
                                onChange={(e) => {
                                    const dateValue = e.target.value;
                                    setFieldValue('resDate', dateValue);
                                    updateAvailableTimes(dateValue);
                                }}
                            />
                            <ErrorMessage name="resDate" component="div" className="error-message" />

                            <label htmlFor="res-time" className="form-label">
                                Choose time
                            </label>
                            <Field
                                as="select"
                                id="res-time"
                                name="resTime"
                                className="form-select"
                            >
                                {availableTimes.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}

                            </Field>
                            <ErrorMessage name="resTime" component="div" className="error-message" />

                            <label htmlFor="guests" className="form-label">
                                Number of guests
                            </label>
                            <Field
                                as="input"
                                type="number"
                                id="guests"
                                name="guests"
                                placeholder="1"
                                min="1"
                                max="10"
                                className="form-input"
                            />
                            <ErrorMessage name="guests" component="div" className="error-message" />

                            <label htmlFor="occasion" className="form-label">
                                Occasion
                            </label>
                            <Field
                                as="select"
                                id="occasion"
                                name="occasion"
                                className="form-select"
                            >
                                <option value="">Choose occasion</option>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </Field>
                            <ErrorMessage name="occasion" component="div" className="error-message" />

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="submit-button"
                            >
                                {isSubmitting ? "sending..." : "Make Your reservation"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default BookingForm;
