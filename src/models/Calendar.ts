import HolidayDao from "../dao/HolidayDao";
import DateHandler from "./DateHandler";
import Holiday from "./Holiday";

class Calendar {
  private period: DateHandler[] = new Array<DateHandler>();
  private holidays: DateHandler[] = new Array<DateHandler>();
  private weekends: DateHandler[] = new Array<DateHandler>();
  private startDateHandler!: DateHandler;
  private endDateHandler!: DateHandler;

  public constructor(startDateString: string, endDateString: string) {
    this.startDateHandler = new DateHandler(startDateString);
    this.endDateHandler = new DateHandler(endDateString);

    this.setPeriod();
    this.setHolidays();
    this.setWeekends();
  }

  public getPeriod(): DateHandler[] {
    return this.period;
  }

  public getHolidays(): DateHandler[] {
    return this.holidays;
  }

  public getWeekends(): DateHandler[] {
    return this.weekends;
  }

  public getWorkdays(): DateHandler[] {
    const weekends: string[] = this.dateHandlerCollectionToString(
      this.weekends,
    );
    const holidays: string[] = this.dateHandlerCollectionToString(
      this.holidays,
    );

    return this.period.filter((dateHanlder) => {
      return (
        !weekends.includes(dateHanlder.getString()) &&
        !holidays.includes(dateHanlder.getString())
      );
    });
  }

  private setPeriod(): void {
    const indexDateHender: DateHandler = this.startDateHandler.clone();
    while (indexDateHender.isSameOrBefore(this.endDateHandler)) {
      this.period.push(indexDateHender.clone());
      indexDateHender.add(1, "day");
    }
  }

  private setHolidays(): void {
    const dao = new HolidayDao();
    this.holidays = dao
      .all()
      .filter((holiday: Holiday) => {
        return holiday
          .getDateHandler()
          .isSameOrBetween(this.startDateHandler, this.endDateHandler);
      })
      .map((holiday: Holiday) => {
        return holiday.getDateHandler();
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

  private dateHandlerCollectionToString(collection: DateHandler[]): string[] {
    return collection.map((item) => item.getString());
  }
}

export default Calendar;
