import { Moment } from "moment-timezone";
import config from "../config";
import DateUtil from "./DateUtil";
import Holiday from "./Holiday";

class Calendar extends DateUtil {
  private readonly dateFormat: string = `${process.env.DATE_FORMAT ||
    config.dateFormat}`;

  private period: Moment[] = new Array<Moment>();
  private holidays: Moment[] = new Array<Moment>();
  private weekends: Moment[] = new Array<Moment>();
  private startMoment!: Moment;
  private endMoment!: Moment;

  public constructor(startMoment: string, endMoment: string) {
    super();
    this.startMoment = this.parseMomentFromString(startMoment);
    this.endMoment = this.parseMomentFromString(endMoment);

    this.setPeriod();
    this.setHolidays();
    this.setWeekends();
  }

  public getPeriod(): Moment[] {
    return this.period;
  }

  public getHolidays(): Moment[] {
    return this.holidays;
  }

  public getWeekends(): Moment[] {
    return this.weekends;
  }

  public getWorkdays(): Moment[] {
    const weekends: string[] = this.convertMomentArrayToStringArray(
      this.weekends,
    );
    const holidays: string[] = this.convertMomentArrayToStringArray(
      this.holidays,
    );

    return this.period.filter((moment) => {
      return (
        !weekends.includes(moment.format(this.dateFormat)) &&
        !holidays.includes(moment.format(this.dateFormat))
      );
    });
  }

  private setPeriod(): void {
    const indexMoment: Moment = this.startMoment.clone();
    while (indexMoment.isSameOrBefore(this.endMoment, "day")) {
      this.period.push(indexMoment.clone());
      indexMoment.add(1, "day");
    }
  }

  private setHolidays(): void {
    const holiday = new Holiday();
    this.holidays = holiday.getHolidays().filter((h: Moment) => {
      return h.isBetween(this.startMoment, this.endMoment, "day");
    });
  }

  private setWeekends(): void {
    const weekends = [0, 6];

    for (const day of this.period) {
      if (weekends.includes(day.weekday())) {
        this.weekends.push(day.clone());
      }
    }
  }

  private convertMomentArrayToStringArray(momentArray: Moment[]): string[] {
    return momentArray.map((moment) => moment.format(this.dateFormat));
  }
}

export default Calendar;
