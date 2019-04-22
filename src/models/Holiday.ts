import DateHandler from "./DateHandler";

class Holiday {
  private dateHandler: DateHandler;

  constructor(holiday: { Data: number }) {
    this.dateHandler = new DateHandler(holiday.Data);
  }

  public getDateHandler(): DateHandler {
    return this.dateHandler;
  }
}

export default Holiday;
