import DateHandler from "../models/DateHandler";

abstract class ResponseFormatter {
  public static json(dateHanderCollection: DateHandler[]): object {
    const obj = {
      count: dateHanderCollection.length,
      dates: dateHanderCollection.map((dateHander) => dateHander.getString()),
    };

    return obj;
  }
}

export default ResponseFormatter;
