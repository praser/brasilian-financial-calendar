import * as dotenv from 'dotenv';
import moment, { Moment } from 'moment-timezone';

dotenv.config();

abstract class DateUtil {
    private static readonly unixEpochDiference: number = 25567;
    private static readonly millisecondsConversionFactor: number = 86400000;
    private static readonly timezone: string = `${process.env.TIMEZONE}`;

    public static parseMomentFromExcel(excelDate: number) : Moment {
        return moment.tz((excelDate - (this.unixEpochDiference + 1))*this.millisecondsConversionFactor, this.timezone);
    }

    public static parseMomentFromString(stringDate: string) : Moment {
        return moment.tz(stringDate, this.timezone);
    }
}

export default DateUtil