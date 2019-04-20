import { Moment } from "moment";
import path from "path";
import * as XLSX from "xlsx";
import config from "../config";
import DateUtil from "./DateUtil";

class Holiday extends DateUtil {
  private readonly path: string = path.join(
    __dirname,
    "../data",
    `${process.env.DATAFILE_NAME || config.dataFileName}`,
  );
  private holidays: Moment[] = new Array<Moment>();

  public constructor() {
    super();
    this.getData().map((data: any) => {
      const date: Moment = this.parseMomentFromExcel(data.Data);
      this.holidays.push(date);
    });
  }

  public getHolidays(): Moment[] {
    return this.holidays;
  }

  private getData(): any {
    const wb = XLSX.readFile(this.path);
    const json = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    json.splice(-5, 5);

    return json;
  }
}

export default Holiday;
