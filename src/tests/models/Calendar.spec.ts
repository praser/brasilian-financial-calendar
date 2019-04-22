import Calendar from "../../models/Calendar";
import DateHandler from "../../models/DateHandler";

let calendar!: Calendar;

describe("Given an interval of dates between 2019-01-01 and 2019-01-31", () => {
  beforeAll(() => {
    const startDate: string = "2019-01-01";
    const endDate: string = "2019-01-31";
    calendar = new Calendar(startDate, endDate);
  });

  it("is expected to have 31 days", () => {
    const expected: number = 31;
    const received: number = calendar.getPeriod().length;
    expect(received).toBe(expected);
  });

  it("is expected to have 1 holiday", () => {
    const expected: number = 1;
    const received: number = calendar.getHolidays().length;
    expect(received).toBe(expected);
  });

  it("is expected to have 2001-01-01 as a holiday", () => {
    const expected: string = "2019-01-01";
    const received: string[] = calendar
      .getHolidays()
      .map((h: DateHandler) => h.getString());
    expect(received).toContain(expected);
  });

  it("is expected to have 8 weekends days", () => {
    const expected: number = 8;
    const received: number = calendar.getWeekends().length;
    expect(received).toBe(expected);
  });

  it("is expected do have 22 working days", () => {
    const expected: number = 22;
    const received: number = calendar.getWorkdays().length;
    expect(received).toBe(expected);
  });
});

describe("Given an interval of dates between 2019-01-06 and 2019-01-12", () => {
  beforeAll(() => {
    const startDate: string = "2019-01-06";
    const endDate: string = "2019-01-12";
    calendar = new Calendar(startDate, endDate);
  });

  it("is expected to have 2 weekends days", () => {
    const expected: number = 2;
    const received: number = calendar.getWeekends().length;
    expect(received).toBe(expected);
  });
});
