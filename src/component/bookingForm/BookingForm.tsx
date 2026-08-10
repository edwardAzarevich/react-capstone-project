import "./bookingForm.css";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import { useState, useEffect } from "react";
import { fetchAPI, submitAPI } from "../../api/api";
import ConfirmedBooking from "./ConfirmedBooking";
import { validateBookingForm } from "../../utils/validation";

export interface BookingFormValues {
  resDate: string;
  resTime: string;
  guests: number;
  occasion: string;
  privacyPolicy: boolean;
}

interface BookedSlotDetails extends BookingFormValues {
  bookingId: number;
  bookedAt: string;
}

interface BookedSlots {
  [key: string]: BookedSlotDetails;
}

const BookingForm: React.FC = () => {
  const initialValues: BookingFormValues = {
    resDate: "",
    resTime: "",
    guests: 1,
    occasion: "",
    privacyPolicy: false,
  };

  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingData, setBookingData] = useState<BookingFormValues | null>(
    null,
  );
  const [bookedSlots, setBookedSlots] = useState<BookedSlots>({});

  const updateAvailableTimes = (dateString: string): void => {
    if (dateString && fetchAPI) {
      const date = new Date(dateString);
      const times = fetchAPI(date) as string[];

      if (!times || !Array.isArray(times)) {
        console.warn("fetchAPI returned invalid data:", times);
        setAvailableTimes([]);
        return;
      }

      const availableTimesFiltered = times.filter((time: string) => {
        const slotKey = `${dateString}-${time}`;
        return !bookedSlots[slotKey];
      });

      setAvailableTimes(availableTimesFiltered);
    } else {
      setAvailableTimes([]);
    }
  };

  useEffect(() => {
    const storedBookings = localStorage.getItem("bookedSlots");
    if (storedBookings) {
      try {
        setBookedSlots(JSON.parse(storedBookings) as BookedSlots);
      } catch (e) {
        console.error("Failed to parse booked slots from localStorage", e);
      }
    }
  }, []);

  const isSlotAvailable = (date: string, time: string): boolean => {
    if (!date || !time) return false;
    const slotKey = `${date}-${time}`;
    return !bookedSlots[slotKey];
  };

  const saveBooking = (booking: BookingFormValues): void => {
    const slotKey = `${booking.resDate}-${booking.resTime}`;
    const updatedBookings: BookedSlots = {
      ...bookedSlots,
      [slotKey]: {
        ...booking,
        bookingId: Date.now(),
        bookedAt: new Date().toISOString(),
      },
    };

    setBookedSlots(updatedBookings);
    localStorage.setItem("bookedSlots", JSON.stringify(updatedBookings));
  };

  const onSubmit = (
    values: BookingFormValues,
    { setSubmitting, setFieldError }: FormikHelpers<BookingFormValues>,
  ): void => {
    if (!isSlotAvailable(values.resDate, values.resTime)) {
      setFieldError(
        "resTime",
        "This time has already been booked. Please choose a different time",
      );
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

  if (isSubmitted && bookingData) {
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
          validateOnBlur={true}
        >
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const dateValue = e.target.value;
                  setFieldValue("resDate", dateValue);
                  updateAvailableTimes(dateValue);
                }}
              />
              <ErrorMessage
                name="resDate"
                component="div"
                className="error-message"
              />

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
              <ErrorMessage
                name="resTime"
                component="div"
                className="error-message"
              />

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
              <ErrorMessage
                name="guests"
                component="div"
                className="error-message"
              />

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
              <ErrorMessage
                name="occasion"
                component="div"
                className="error-message"
              />

              <div className="form-group">
                <Field
                  type="checkbox"
                  id="privacy-policy"
                  name="privacyPolicy"
                  className="form-checkbox"
                />
                <label htmlFor="privacy-policy" className="checkbox-label">
                  You agree to our friendly{" "}
                  <a
                    href="/privacy-policy"
                    className="privacy-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy policy
                  </a>
                </label>
                <ErrorMessage
                  name="privacyPolicy"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                aria-label="on Click"
                disabled={
                  isSubmitting ||
                  !isValid ||
                  !dirty ||
                  availableTimes.length === 0
                }
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
};

export default BookingForm;
