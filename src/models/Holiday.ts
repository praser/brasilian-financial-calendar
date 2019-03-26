import * as dotenv from 'dotenv';
import path from 'path';
import * as XLSX from 'xlsx';

dotenv.config();

class Holiday {
    private readonly path: string = path.join(__dirname, '../data', `${process.env.DATAFILE_NAME}`);
    private holidays: Array<Date> = new Array<Date>();

    public constructor() {
        this.getData().map((data: any) => {
            this.holidays.push(new Date(1900, 0, data.Data -1));
        });
    }

    private getData(): any {
        const wb = XLSX.readFile(this.path);
        const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        json.splice(-5, 5);

        return json;
    }

    public getHolidays(): Array<Date> {
        return this.holidays;
    }
}

export default Holiday;