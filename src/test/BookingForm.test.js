import { render, screen, waitFor } from "@testing-library/react";
import BookingForm from "../component/bookingForm/BookingForm";
import userEvent from '@testing-library/user-event';


test("Renders the BookingForm heading", () => {
    render(<BookingForm />);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
})


describe('BookingForm', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    const renderComponent = () => {
        return render(<BookingForm />);
    };

    beforeEach(() => {
        mockConsoleLog.mockClear();
    });

    afterAll(() => {
        mockConsoleLog.mockRestore();
    });

    test('renders form fields correctly', () => {
        renderComponent();

        expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /make your reservation/i })).toBeInTheDocument();
    });

    test('submits form with correct values', async () => {
        const user = userEvent.setup();
        renderComponent();

        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i);
        const submitButton = screen.getByRole('button', { name: /make your reservation/i });

        await user.type(dateInput, '2026-02-15');
        await user.selectOptions(timeSelect, '17:00');
        await user.clear(guestsInput);
        await user.type(guestsInput, '4');
        await user.selectOptions(occasionSelect, 'Birthday');

        await user.click(submitButton);

        await waitFor(() => {
            expect(mockConsoleLog).toHaveBeenCalledWith('send:', {
                resDate: '2026-02-15',
                resTime: '17:00',
                guests: 4,
                occasion: 'Birthday'
            });
        });
    });

    test('validates past dates', async () => {
        const user = userEvent.setup();
        render(<BookingForm />);

        const dateInput = screen.getByLabelText(/choose date/i);

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split('T')[0];

        await user.type(dateInput, yesterdayString);
        await user.tab();

        await waitFor(() => {
            expect(screen.getByText('The date cannot be in the past')).toBeInTheDocument();
        });
    });


});