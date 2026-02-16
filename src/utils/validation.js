export const validateBookingForm = (values, isSlotAvailable) => {
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
    } else if (isSlotAvailable && !isSlotAvailable(values.resDate, values.resTime)) {
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
