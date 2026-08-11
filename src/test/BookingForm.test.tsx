import { render, screen, waitFor } from "@testing-library/react";
import BookingForm from "../component/bookingForm/BookingForm";
import userEvent from "@testing-library/user-event";
import { validateBookingForm } from "../utils/validation";
import {
  vi,
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  Mock,
} from "vitest";

declare global {
  interface Window {
    fetchAPI: Mock<(date: Date) => string[] | undefined>;
    submitAPI: Mock<(values: any) => boolean>;
  }
}

vi.mock("../utils/validation", () => ({
  validateBookingForm: vi.fn(),
}));

const mockValidateBookingForm = validateBookingForm as Mock<
  typeof validateBookingForm
>;

beforeAll(() => {
  window.fetchAPI = vi.fn();
  window.submitAPI = vi.fn();
});

describe("BookingForm localStorage", () => {
  let mockLocalStorage: {
    getItem: Mock<(key: string) => string | null>;
    setItem: Mock<(key: string, value: string) => void>;
    removeItem: Mock<(key: string) => void>;
    clear: Mock<() => void>;
  };

  beforeEach(() => {
    mockLocalStorage = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    };

    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });

    window.fetchAPI.mockReturnValue(["17:00", "17:30", "20:30", "22:30"]);
    window.submitAPI.mockReturnValue(true);

    mockValidateBookingForm.mockReturnValue({});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("loads booked slots from localStorage on mount", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        "2026-02-15-17:00": { resDate: "2026-02-15", resTime: "17:00" },
      }),
    );

    render(<BookingForm />);

    const dateInput = screen.getByLabelText(/choose date/i);
    await userEvent.type(dateInput, "2026-02-15");

    await waitFor(() => {
      const timeSelect = screen.getByLabelText(/choose time/i);

      expect(timeSelect.children).toHaveLength(4);

      expect(screen.queryByText("17:00")).not.toBeInTheDocument();
      expect(screen.getByText("17:30")).toBeInTheDocument();
    });
  });

  test("saves booking to localStorage on successful submit", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);

    await user.type(dateInput, "2026-02-15");
    await user.selectOptions(timeSelect, "17:30");
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");
    await user.selectOptions(occasionSelect, "Birthday");

    const submitButton = screen.getByRole("button", { name: /on Click/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
        "bookedSlots",
        expect.stringContaining("2026-02-15-17:30"),
      );
    });
  });

  test("returns valid values on filter mock data", async () => {
    mockLocalStorage.getItem.mockReturnValue(
      JSON.stringify({
        "2026-02-15-17:00": { resDate: "2026-02-15", resTime: "17:00" },
      }),
    );

    render(<BookingForm />);
    const dateInput = screen.getByLabelText(/choose date/i);

    await userEvent.type(dateInput, "2026-02-15");

    await waitFor(() => {
      const timeSelect = screen.getByLabelText(/choose time/i);
      expect(timeSelect).toBeInTheDocument();
      expect(screen.getByText("17:30")).toBeInTheDocument();
      expect(screen.queryByText("17:00")).not.toBeInTheDocument();
    });
  });
});

test("Renders the BookingForm heading", () => {
  render(<BookingForm />);
  const headingElement = screen.getByText("Book Now");
  expect(headingElement).toBeInTheDocument();
});

describe("BookingForm", () => {
  const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

  const renderComponent = () => {
    return render(<BookingForm />);
  };

  beforeEach(() => {
    mockConsoleLog.mockClear();
    mockValidateBookingForm.mockReturnValue({});
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  test("renders form fields correctly", () => {
    renderComponent();

    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /on Click/i }),
    ).toBeInTheDocument();
  });

  test("submits form with correct values", async () => {
    vi.spyOn(window.localStorage, "getItem").mockReturnValue(
      JSON.stringify({}),
    );

    const user = userEvent.setup();
    renderComponent();

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const privacyCheckbox = screen.getByLabelText(/friendly privacy policy/i);
    const submitButton = screen.getByRole("button", { name: /on Click/i });

    await user.type(dateInput, "2026-02-15");

    await waitFor(() => {
      const option = screen.queryByText("17:00");
      expect(option).not.toBeNull();
    });

    await user.selectOptions(timeSelect, "17:00");
    await user.clear(guestsInput);
    await user.type(guestsInput, "4");
    await user.selectOptions(occasionSelect, "Birthday");
    await user.click(privacyCheckbox);

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await user.click(submitButton);

    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith("send:", {
        resDate: "2026-02-15",
        resTime: "17:00",
        guests: 4,
        occasion: "Birthday",
        privacyPolicy: true,
      });
    });
  });

  test("validates past dates", async () => {
    const user = userEvent.setup();
    render(<BookingForm />);

    mockValidateBookingForm.mockReturnValue({
      resDate: "The date cannot be in the past",
    });

    const dateInput = screen.getByLabelText(/choose date/i);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    await user.type(dateInput, yesterdayString);
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText("The date cannot be in the past"),
      ).toBeInTheDocument();
    });
  });
});
