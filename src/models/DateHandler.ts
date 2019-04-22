import moment, { Moment } from "moment-timezone";
import config from "../config";

class DateHandler {
  private readonly dateFormat: string =
    process.env.DATE_FORMAT || config.dateFormat;
  private readonly timezone: string =
    process.env.TZ !== undefined ? process.env.TZ : "America/Sao_Paulo";
  private moment!: Moment;

  constructor(date: string | number) {
    switch (typeof date) {
      case "string":
        this.moment = moment.tz(date, this.dateFormat, true, this.timezone);
        break;
      case "number":
        const parsedDate: string = this.parseDateFromNumber(date);
        this.moment = moment.tz(
          parsedDate,
          moment.ISO_8601,
          true,
          this.timezone,
        );
        break;
    }
  }

  public getTimezone(): string {
    return this.timezone;
  }

  public getString(): string {
    return this.moment.format(this.dateFormat);
  }

  public isValid(): boolean {
    return this.moment.isValid();
  }

  public isSameOrBefore(dateHandler: DateHandler): boolean {
    return this.moment.isSameOrBefore(dateHandler.getString(), "day");
  }

  public isSameOrAfter(dateHandler: DateHandler): boolean {
    return this.moment.isSameOrAfter(dateHandler.getString(), "day");
  }

  public isSameOrBetween(start: DateHandler, end: DateHandler): boolean {
    return this.isSameOrAfter(start) && this.isSameOrBefore(end);
  }

  public clone(): DateHandler {
    return new DateHandler(this.getString());
  }

  public add(amount: any, type: string): DateHandler {
    const dateString: string = this.moment
      .add(amount, type)
      .format(this.dateFormat);
    return new DateHandler(dateString);
  }

  public weekday(): number {
    return this.moment.weekday();
  }

  private parseDateFromNumber(numberDate: number): string {
    // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")
    // 2. Convert to milliseconds.
    return new Date((numberDate - (25567 + 1)) * 86400 * 1000).toISOString();
  }
}

export default DateHandler;
