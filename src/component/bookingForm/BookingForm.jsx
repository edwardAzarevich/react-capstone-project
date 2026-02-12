import { Formik, Field, Form, ErrorMessage } from "formik";
import "./bookingForm.css";
import { useState, useEffect } from 'react';
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
    const [bookedSlots, setBookedSlots] = useState({});

    const updateAvailableTimes = (dateString) => {
        if (dateString && fetchAPI) {
            const date = new Date(dateString);
            const times = fetchAPI(date);

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

    const validateForm = (values) => {
        const errors = {};

        if (!values.resDate) {
            errors.resDate = 'Please select a date';
        } else {
            const selectedDate = new Date(values.resDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                errors.resDate = 'The date cannot be in the past';
            }
        }

        if (!values.resTime) {
            errors.resTime = 'Please select a time.';
        } else if (!isSlotAvailable(values.resDate, values.resTime)) {
            errors.resTime = 'This time has already been booked. Please choose a different time';
        }

        if (!values.guests) {
            errors.guests = 'Please specify the number of guests';
        } else if (values.guests < 1) {
            errors.guests = 'Minimum of 1 guest';
        } else if (values.guests > 10) {
            errors.guests = 'Maximum of 10 guests';
        }

        if (!values.occasion) {
            errors.occasion = 'Please choose a reason';
        }

        return errors;
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
                    validate={validateForm}
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
