import { Moment } from "moment-timezone";
import config from "../config";

abstract class ResponseFormatter {

  public static json(moments: Moment[]): object {
    const obj = {
      count: moments.length,
      dates: moments.map((moment) => moment.format(this.dateFormat)),
    };

    return obj;
  }
  private static readonly dateFormat: string = `${process.env.DATE_FORMAT ||
    config.dateFormat}`;
}

export default ResponseFormatter;
