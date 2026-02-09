import { Formik, Field, Form, ErrorMessage } from "formik";

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
        <>
            <div>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                    {({ isSubmitting, values, setFieldValue }) => (
                        <Form style={{ display: "grid", maxWidth: "200px", gap: "20px" }}>
                            <label htmlFor="res-date">Choose date</label>
                            <Field
                                as="input"
                                type="date"
                                id="res-date"
                                name="resDate"
                                value={values.resDate}
                            />
                            <ErrorMessage name="resDate" component="div" style={{ color: 'red', fontSize: '0.875em' }} />

                            <label htmlFor="res-time">Choose time</label>
                            <Field as="select" id="res-time" name="resTime">
                                <option value="">Выберите время</option>
                                <option>17:00</option>
                                <option>18:00</option>
                                <option>19:00</option>
                                <option>20:00</option>
                                <option>21:00</option>
                                <option>22:00</option>
                            </Field>
                            <ErrorMessage name="resTime" component="div" style={{ color: 'red', fontSize: '0.875em' }} />

                            <label htmlFor="guests">Number of guests</label>
                            <Field
                                as="input"
                                type="number"
                                id="guests"
                                name="guests"
                                placeholder="1"
                                min="1"
                                max="10"
                            />
                            <ErrorMessage name="guests" component="div" style={{ color: 'red', fontSize: '0.875em' }} />

                            <label htmlFor="occasion">Occasion</label>
                            <Field as="select" id="occasion" name="occasion">
                                <option value="">Выберите повод</option>
                                <option>Birthday</option>
                                <option>Anniversary</option>
                            </Field>
                            <ErrorMessage name="occasion" component="div" style={{ color: 'red', fontSize: '0.875em' }} />

                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Отправка..." : "Make Your reservation"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default BookingForm;
