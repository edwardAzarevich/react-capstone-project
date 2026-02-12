import { Formik, Field, Form, ErrorMessage } from "formik";
import "./bookingForm.css";

const BookingForm = () => {
    const initialValues = {
        resDate: "",
        resTime: "",
        guests: 1,
        occasion: "",
    };

    const onSubmit = (values, { setSubmitting }) => {
        console.log("send:", values);
        setTimeout(() => {
            setSubmitting(false);
            alert("booking");
        }, 1000);
    };

    return (
        <div className="booking-container">
            <div className="booking-card">
                <header className="booking-header">Book Now</header>

                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting, values }) => (
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
                                <option value="">Choose time</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                <option>22:00</option>
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
