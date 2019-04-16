import moment, { Moment } from "moment-timezone";
import config from "../config";

abstract class DateUtil {
  protected readonly timezone: string = `${process.env.TIMEZONE ||
    config.timezone}`;
  private readonly unixEpochDiference: number = 25567;
  private readonly millisecondsConversionFactor: number = 86400000;

  public parseMomentFromExcel(excelDate: number): Moment {
    return moment.tz(
      (excelDate - (this.unixEpochDiference + 1)) *
        this.millisecondsConversionFactor,
      this.timezone,
    );
  }

  public parseMomentFromString(stringDate: string): Moment {
    return moment.tz(stringDate, this.timezone);
  }
}

export default DateUtil;
