import { render, screen, waitFor } from "@testing-library/react";
import BookingForm from "../component/bookingForm/BookingForm";
import userEvent from '@testing-library/user-event';
import { validateBookingForm } from '../utils/validation';


jest.mock('../utils/validation', () => ({
    validateBookingForm: jest.fn()
}));

beforeAll(() => {
    window.fetchAPI = jest.fn();
    window.submitAPI = jest.fn();
});

describe('BookingForm localStorage', () => {
    let mockLocalStorage;

    beforeEach(() => {
        mockLocalStorage = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            removeItem: jest.fn(),
            clear: jest.fn()
        };

        Object.defineProperty(window, 'localStorage', {
            value: mockLocalStorage,
            writable: true
        });

        window.fetchAPI.mockReturnValue(['17:00', '17:30', '20:30', '22:30']);
        window.submitAPI.mockReturnValue(true);

        // По умолчанию валидация проходит успешно (возвращает пустой объект)
        validateBookingForm.mockReturnValue({});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('loads booked slots from localStorage on mount', async () => {
        mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
            '2026-02-15-17:00': { resDate: '2026-02-15', resTime: '17:00' }
        }));

        render(<BookingForm />);

        const dateInput = screen.getByLabelText(/choose date/i);
        await userEvent.type(dateInput, '2026-02-15');

        await waitFor(() => {
            const timeSelect = screen.getByLabelText(/choose time/i);
            // Проверяем что опций 4 (включая пустую опцию)
            expect(timeSelect.children).toHaveLength(4);
            // Проверяем что забронированное время отсутствует
            expect(screen.queryByText('17:00')).not.toBeInTheDocument();
            expect(screen.getByText('17:30')).toBeInTheDocument();
        });
    });

    test('saves booking to localStorage on successful submit', async () => {
        const user = userEvent.setup();
        render(<BookingForm />);

        const dateInput = screen.getByLabelText(/choose date/i);
        const timeSelect = screen.getByLabelText(/choose time/i);
        const guestsInput = screen.getByLabelText(/number of guests/i);
        const occasionSelect = screen.getByLabelText(/occasion/i);

        await user.type(dateInput, '2026-02-15');
        await user.selectOptions(timeSelect, '17:30');
        await user.clear(guestsInput);
        await user.type(guestsInput, '4');
        await user.selectOptions(occasionSelect, 'Birthday');

        const submitButton = screen.getByRole('button', { name: /make your reservation/i });
        await user.click(submitButton);

        await waitFor(() => {
            expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
                'bookedSlots',
                expect.stringContaining('2026-02-15-17:30')
            );
        });
    });

    test('filters out booked slots from available times', async () => {
        mockLocalStorage.getItem.mockReturnValue(JSON.stringify({
            '2026-02-15-17:00': { resDate: '2026-02-15', resTime: '17:00' }
        }));

        render(<BookingForm />);
        const dateInput = screen.getByLabelText(/choose date/i);

        await userEvent.type(dateInput, '2026-02-15');

        await waitFor(() => {
            const timeSelect = screen.getByLabelText(/choose time/i);
            expect(screen.getByText('17:30')).toBeInTheDocument();
            expect(screen.queryByText('17:00')).not.toBeInTheDocument();
        });
    });
});

test("Renders the BookingForm heading", () => {
    render(<BookingForm />);
    const headingElement = screen.getByText("Book Now");
    expect(headingElement).toBeInTheDocument();
});

describe('BookingForm', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

    const renderComponent = () => {
        return render(<BookingForm />);
    };

    beforeEach(() => {
        mockConsoleLog.mockClear();
        // Убеждаемся что валидация проходит
        validateBookingForm.mockReturnValue({});
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

        // Мокаем возврат ошибки валидации
        validateBookingForm.mockReturnValue({
            resDate: 'The date cannot be in the past'
        });

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
