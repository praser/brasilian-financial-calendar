import config from '../config';
import { Moment } from 'moment-timezone';

abstract class ResponseFormatter {
    private static readonly dateFormat: string = `${process.env.DATE_FORMAT || config.dateFormat}`;

    public static json(moments: Array<Moment>): object {
        const obj = {
            count: moments.length,
            dates: moments.map(moment => moment.format(this.dateFormat))
        }

        return obj;
    }
}

export default ResponseFormatter;