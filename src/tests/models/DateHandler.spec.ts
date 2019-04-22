import config from "../../config";
import DateHandler from "../../models/DateHandler";

describe("given a string date 2001-01-01", () => {
  const dateString: string = "2001-01-01";
  let date!: DateHandler;

  beforeEach(() => {
    date = new DateHandler(dateString);
  });

  it("is expected to have default timezone", () => {
    expect(date.getTimezone()).toBe(config.tz);
  });

  it("is expected to return 2001-01-01 when getString() is called", () => {
    expect(date.getString()).toBe("2001-01-01");
  });

  it("is expected to return true when isSameOrBefore('2001-01-01') is called", () => {
    const afterDateHandler = new DateHandler("2001-01-01");
    const actual: boolean = date.isSameOrBefore(afterDateHandler);
    expect(actual).toBeTruthy();
  });

  it("is expected to return true when isSameOrBefore('2001-01-02') is called", () => {
    const afterDateHandler = new DateHandler("2001-01-02");
    const actual: boolean = date.isSameOrBefore(afterDateHandler);
    expect(actual).toBeTruthy();
  });

  it("is expected to return false when isSameOrBefore('2000-12-31') is called", () => {
    const afterDateHandler = new DateHandler("2000-12-31");
    const actual: boolean = date.isSameOrBefore(afterDateHandler);
    expect(actual).toBeFalsy();
  });

  it("is expected to return true when isSameOrAfter('2001-01-01') is called", () => {
    const afterDateHandler = new DateHandler("2001-01-01");
    const actual: boolean = date.isSameOrAfter(afterDateHandler);
    expect(actual).toBeTruthy();
  });

  it("is expected to return true when isSameOrAfter('2000-12-31') is called", () => {
    const afterDateHandler = new DateHandler("2000-12-31");
    const actual: boolean = date.isSameOrAfter(afterDateHandler);
    expect(actual).toBeTruthy();
  });

  it("is expected to return false when isSameOrAfter('2001-01-02') is called", () => {
    const afterDateHandler = new DateHandler("2001-01-02");
    const actual: boolean = date.isSameOrAfter(afterDateHandler);
    expect(actual).toBeFalsy();
  });

  it("is expected to return true when isSameOrBetween('2001-01-01', '2001-01-02') is called", () => {
    const startDate: DateHandler = new DateHandler("2001-01-01");
    const endDate: DateHandler = new DateHandler("2001-01-02");
    const received: boolean = date.isSameOrBetween(startDate, endDate);
    expect(received).toBeTruthy();
  });

  it("is expected to return true when isSameOrBetween('2000-12-31', '2001-01-01') is called", () => {
    const startDate: DateHandler = new DateHandler("2000-12-31");
    const endDate: DateHandler = new DateHandler("2001-01-01");
    const received: boolean = date.isSameOrBetween(startDate, endDate);
    expect(received).toBeTruthy();
  });

  it("is expected to return false when isSameOrBetween('2000-12-30', '2000-12-31') is called", () => {
    const startDate: DateHandler = new DateHandler("2000-12-30");
    const endDate: DateHandler = new DateHandler("2000-12-31");
    const received: boolean = date.isSameOrBetween(startDate, endDate);
    expect(received).toBeFalsy();
  });

  it("is expected to return false when isSameOrBetween('2001-01-02', '2001-01-03') is called", () => {
    const startDate: DateHandler = new DateHandler("2000-12-30");
    const endDate: DateHandler = new DateHandler("2000-12-31");
    const received: boolean = date.isSameOrBetween(startDate, endDate);
    expect(received).toBeFalsy();
  });

  it("is expected to return a self clone when clone() is called", () => {
    const expected: DateHandler = date.clone();
    expect(expected).toEqual(date);
    expect(expected).not.toBe(date);
  });

  it("is expected to add one day when .add(1, 'day') is called", () => {
    const expected: DateHandler = new DateHandler("2001-01-02");
    const received: DateHandler = date.add(1, "day");
    expect(received).toEqual(expected);
  });
});

describe("given a number date 36892", () => {
  const dateNumber: number = 36892;
  let date!: DateHandler;

  beforeEach(() => {
    date = new DateHandler(dateNumber);
  });

  it("is expected to have default timezone", () => {
    expect(date.getTimezone()).toBe(config.tz);
  });

  it("is expected to return 2001-01-01 when getString() is called", () => {
    expect(date.getString()).toBe("2001-01-01");
  });

  it("is expected to return x when .weekday() is called", () => {
    expect(date.weekday()).toBe(1);
  });
});

describe("given a valid date", () => {
  const validDate = "2001-01-01";

  it("is expectect to be valid", () => {
    const date: DateHandler = new DateHandler(validDate);
    expect(date.isValid()).toBeTruthy();
  });
});

describe("given an invalid date", () => {
  const invalidDate = "invalid";

  it("is expectect to be invalid", () => {
    const date: DateHandler = new DateHandler(invalidDate);
    expect(date.isValid()).toBeFalsy();
  });
});

it("is expected to set TZ from environment variable", () => {
  process.env.TZ = "Europe/Amsterdam";
  const dh = new DateHandler("2001-01-01");
  expect(dh.getTimezone()).toBe(process.env.TZ);
});
