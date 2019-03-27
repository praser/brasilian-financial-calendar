import * as dotenv from 'dotenv';
import path from 'path';
import * as XLSX from 'xlsx';
import { Moment } from 'moment-timezone';
import DateUtil from '../utils/DateUtil';

dotenv.config();

class Holiday {
    private readonly timezone: string = `${process.env.TIMEZONE}`;
    private readonly path: string = path.join(__dirname, '../data', `${process.env.DATAFILE_NAME}`);
    private holidays: Array<Moment> = new Array<Moment>();

    public constructor() {
        this.getData().map((data: any) => {
            const date: Moment = DateUtil.parseMomentFromExcel(data.Data);
            this.holidays.push(date.tz(this.timezone));
        });
    }

    private getData(): any {
        const wb = XLSX.readFile(this.path);
        const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        json.splice(-5, 5);

        return json;
    }

    public getHolidays(): Array<Moment> {
        return this.holidays;
    }
}

export default Holiday;