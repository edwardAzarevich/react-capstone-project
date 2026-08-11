import { validateBookingForm } from "../utils/validation";
import { vi, describe, test, expect, type Mock } from "vitest";
import type { BookingFormValues } from "../component/bookingForm/BookingForm";

describe("validateBookingForm", () => {
  const getDateString = (daysOffset = 0): string => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    return date.toISOString().split("T")[0];
  };

  const getValidValues = (): BookingFormValues => ({
    resDate: getDateString(1),
    resTime: "18:00",
    guests: 4,
    occasion: "Birthday",
    privacyPolicy: true,
  });

  describe("Date validation", () => {
    test("should return error if resDate is empty", () => {
      const values = { ...getValidValues(), resDate: "" } as any;
      const errors = validateBookingForm(values);

      expect(errors.resDate).toBe("Please select a date");
    });

    test("should return error if resDate is in the past", () => {
      const pastDate = getDateString(-1);
      const values = { ...getValidValues(), resDate: pastDate };
      const errors = validateBookingForm(values);

      expect(errors.resDate).toBe("The date cannot be in the past");
    });

    test("should NOT return error for today's date", () => {
      const today = getDateString(0);
      const values = { ...getValidValues(), resDate: today };
      const errors = validateBookingForm(values);

      expect(errors.resDate).toBeUndefined();
    });

    test("should NOT return error for future date", () => {
      const futureDate = getDateString(1);
      const values = { ...getValidValues(), resDate: futureDate };
      const errors = validateBookingForm(values);

      expect(errors.resDate).toBeUndefined();
    });
  });

  describe("Time validation", () => {
    test("should return error if resTime is empty", () => {
      const values = { ...getValidValues(), resTime: "" };
      const errors = validateBookingForm(values);

      expect(errors.resTime).toBe("Please select a time.");
    });

    test("should return error if time slot is already booked", () => {
      const mockIsSlotAvailable: Mock<(date: string, time: string) => boolean> =
        vi.fn().mockReturnValue(false);
      const values = getValidValues();

      const errors = validateBookingForm(values, mockIsSlotAvailable);

      expect(errors.resTime).toBe(
        "This time has already been booked. Please choose a different time",
      );
      expect(mockIsSlotAvailable).toHaveBeenCalledWith(
        values.resDate,
        values.resTime,
      );
    });

    test("should NOT return error if time slot is available", () => {
      const mockIsSlotAvailable: Mock<(date: string, time: string) => boolean> =
        vi.fn().mockReturnValue(true);
      const values = getValidValues();

      const errors = validateBookingForm(values, mockIsSlotAvailable);

      expect(errors.resTime).toBeUndefined();
      expect(mockIsSlotAvailable).toHaveBeenCalledWith(
        values.resDate,
        values.resTime,
      );
    });

    test("should not check availability if isSlotAvailable function is not provided", () => {
      const values = getValidValues();
      const errors = validateBookingForm(values);

      expect(errors.resTime).toBeUndefined();
    });

    test("should not check availability if resDate is empty", () => {
      const mockIsSlotAvailable = vi.fn();
      const values = {
        ...getValidValues(),
        resDate: "",
        resTime: "18:00",
      } as any;

      const errors = validateBookingForm(values, mockIsSlotAvailable);

      expect(errors.resDate).toBe("Please select a date");
      expect(mockIsSlotAvailable).not.toHaveBeenCalled();
    });
  });

  describe("Guests validation", () => {
    test("should return error if guests is empty", () => {
      const values = { ...getValidValues(), guests: "" } as any;
      const errors = validateBookingForm(values);

      expect(errors.guests).toBe("Please specify the number of guests");
    });

    test("should return error if guests is less than 1", () => {
      const values = { ...getValidValues(), guests: 0 };
      const errors = validateBookingForm(values);

      expect(errors.guests).toBe("Minimum of 1 guest");
    });

    test("should return error if guests is more than 10", () => {
      const values = { ...getValidValues(), guests: 11 };
      const errors = validateBookingForm(values);

      expect(errors.guests).toBe("Maximum of 10 guests");
    });

    test("should NOT return error if guests is between 1 and 10", () => {
      const testValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      testValues.forEach((guests) => {
        const values = { ...getValidValues(), guests };
        const errors = validateBookingForm(values);

        expect(errors.guests).toBeUndefined();
      });
    });
  });

  describe("Occasion validation", () => {
    test("should return error if occasion is empty", () => {
      const values = { ...getValidValues(), occasion: "" };
      const errors = validateBookingForm(values);

      expect(errors.occasion).toBe("Please choose a reason");
    });

    test("should NOT return error if occasion is selected", () => {
      const occasions = [
        "Birthday",
        "Anniversary",
        "Wedding",
        "Business Dinner",
      ];

      occasions.forEach((occasion) => {
        const values = { ...getValidValues(), occasion };
        const errors = validateBookingForm(values);

        expect(errors.occasion).toBeUndefined();
      });
    });
  });

  describe("Multiple validation errors", () => {
    test("should return multiple errors for invalid form", () => {
      const values = {
        resDate: "",
        resTime: "",
        guests: 0,
        occasion: "",
      } as any;

      const errors = validateBookingForm(values);

      expect(errors).toEqual({
        resDate: "Please select a date",
        resTime: "Please select a time.",
        guests: "Minimum of 1 guest",
        occasion: "Please choose a reason",
      });
    });

    test("should return empty object for valid form", () => {
      const errors = validateBookingForm(getValidValues());

      expect(errors).toEqual({});
    });

    test("should handle partial validation with some fields empty", () => {
      const values = {
        resDate: getDateString(1),
        resTime: "",
        guests: 4,
        occasion: "",
      } as any;

      const errors = validateBookingForm(values);

      expect(errors).toEqual({
        resTime: "Please select a time.",
        occasion: "Please choose a reason",
      });
    });
  });

  describe("Edge cases", () => {
    test("should handle undefined values", () => {
      const values = {
        resDate: undefined,
        resTime: undefined,
        guests: undefined,
        occasion: undefined,
      } as any;

      const errors = validateBookingForm(values);

      expect(errors).toEqual({
        resDate: "Please select a date",
        resTime: "Please select a time.",
        guests: "Please specify the number of guests",
        occasion: "Please choose a reason",
      });
    });

    test("should handle null values", () => {
      const values = {
        resDate: null,
        resTime: null,
        guests: null,
        occasion: null,
      } as any;

      const errors = validateBookingForm(values);

      expect(errors).toEqual({
        resDate: "Please select a date",
        resTime: "Please select a time.",
        guests: "Please specify the number of guests",
        occasion: "Please choose a reason",
      });
    });

    test("should handle negative guest count", () => {
      const values = { ...getValidValues(), guests: -5 };
      const errors = validateBookingForm(values);

      expect(errors.guests).toBe("Minimum of 1 guest");
    });
  });
});
