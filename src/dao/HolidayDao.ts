import path from "path";
import * as XLSX from "xlsx";
import config from "../config";
import Holiday from "../models/Holiday";
import { Dao } from "../modules";

class HolidayDao implements Dao {
  private readonly path: string = path.join(
    __dirname,
    "../data",
    `${process.env.DATAFILE_NAME || config.dataFileName}`,
  );

  public all(): Holiday[] {
    const data: any = this.getData();
    return data.map((d: any) => {
      return new Holiday(d);
    });
  }

  private getData(): any {
    const wb = XLSX.readFile(this.path);
    const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
    data.splice(-5, 5);
    return data;
  }
}

export default HolidayDao;
