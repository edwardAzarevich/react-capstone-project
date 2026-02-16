import { Formik, Field, Form, ErrorMessage } from "formik";
import "./bookingForm.css";
import { useState, useEffect } from 'react';
import { fetchAPI, submitAPI } from '../../api/api';
import ConfirmedBooking from './ConfirmedBooking';
import { validateBookingForm } from '../../utils/validation';

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
    const [bookedSlots, setBookedSlots] = useState({});

    const updateAvailableTimes = (dateString) => {
        if (dateString && fetchAPI) {
            const date = new Date(dateString);
            const times = fetchAPI(date);

            if (!times || !Array.isArray(times)) {
                console.warn('fetchAPI returned invalid data:', times);
                setAvailableTimes([]);
                return;
            }

            const availableTimesFiltered = times.filter(time => {
                const slotKey = `${dateString}-${time}`;
                return !bookedSlots[slotKey];
            });

            setAvailableTimes(availableTimesFiltered);
        } else {
            setAvailableTimes([]);
        }
    };

    useEffect(() => {
        const storedBookings = localStorage.getItem('bookedSlots');
        if (storedBookings) {
            setBookedSlots(JSON.parse(storedBookings));
        }
    }, []);

    const isSlotAvailable = (date, time) => {
        if (!date || !time) return false;
        const slotKey = `${date}-${time}`;
        return !bookedSlots[slotKey];
    };

    const saveBooking = (booking) => {
        const slotKey = `${booking.resDate}-${booking.resTime}`;
        const updatedBookings = {
            ...bookedSlots,
            [slotKey]: {
                ...booking,
                bookingId: Date.now(),
                bookedAt: new Date().toISOString()
            }
        };

        setBookedSlots(updatedBookings);
        localStorage.setItem('bookedSlots', JSON.stringify(updatedBookings));
    };

    const onSubmit = (values, { setSubmitting, setFieldError }) => {
        if (!isSlotAvailable(values.resDate, values.resTime)) {
            setFieldError('resTime', 'This time has already been booked. Please choose a different time');
            setSubmitting(false);

            updateAvailableTimes(values.resDate);
            return;
        }

        console.log("send:", values);

        if (submitAPI) {
            const success = submitAPI(values);
            if (success) {
                saveBooking(values);
                setBookingData(values);
                setIsSubmitted(true);
                setAvailableTimes([]);
            }
        }

        setSubmitting(false);
    };

    if (isSubmitted) {
        return <ConfirmedBooking bookingDetails={bookingData} />;
    }

    return (
        <div className="booking-container">
            <div className="booking-card">
                <header className="booking-header">Book Now</header>

                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validate={validateBookingForm}
                    validateOnChange={true}
                    validateOnBlur={true}>
                    {({ isSubmitting, values, setFieldValue, isValid, dirty }) => (
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
                                <option value="">Select a time</option>
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
                                <option value="Birthday">Birthday</option>
                                <option value="Anniversary">Anniversary</option>
                            </Field>
                            <ErrorMessage name="occasion" component="div" className="error-message" />

                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid || !dirty || availableTimes.length === 0}
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
