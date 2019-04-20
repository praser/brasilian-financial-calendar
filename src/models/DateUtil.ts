import moment, { Moment } from "moment";

abstract class DateUtil {
  public parseMomentFromExcel(excelDate: number): Moment {
    const date: Date = this.parseDateFromExcel(excelDate);
    return this.parseMomentFromString(this.dateToString(date));
  }

  public parseMomentFromString(stringDate: string): Moment {
    return moment(stringDate);
  }

  private parseDateFromExcel(excelDate: number): Date {
    // 1. Subtract number of days between Jan 1, 1900 and Jan 1, 1970, plus 1 (Google "excel leap year bug")
    // 2. Convert to milliseconds.
    return new Date((excelDate - (25567 + 1)) * 86400 * 1000);
  }

  private dateToString(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = this.formatDayAndMonth(date.getMonth() + 1);
    const day: string = this.formatDayAndMonth(date.getDay());

    return `${year}-${month}-${day}`;
  }

  private formatDayAndMonth(n: number): string {
    return `${n}`.length === 2 ? `${n}` : `0${n}`;
  }
}

export default DateUtil;
