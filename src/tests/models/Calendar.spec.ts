import Calendar from "../../models/Calendar";

let calendar!: Calendar;

describe("Given an interval of dates between 2019-01-01 and 2019-12-01", () => {
  beforeAll(() => {
    const startMoment: string = "2019-01-01";
    const endMoment: string = "2019-12-31";
    calendar = new Calendar(startMoment, endMoment);
  });

  it("is expected to have 365 days", () => {
    const expected: number = 366;
    const received: number = calendar.getPeriod().length;
    expect(received).toBe(expected);
  });

  it("is expected to have 11 holidays", () => {
    const expected: number = 11;
    const received: number = calendar.getHolidays().length;
    expect(received).toBe(expected);
  });

  it("is expected to have 105 weekends days", () => {
    const expected: number = 105;
    const received: number = calendar.getWeekends().length;
    expect(received).toBe(expected);
  });

  it("is expected do have 254 working days", () => {
    const expected: number = 254;
    const received: number = calendar.getWorkdays().length;
    expect(received).toBe(expected);
  });
});
