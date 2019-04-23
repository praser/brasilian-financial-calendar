import HolidayDao from "../../dao/HolidayDao";
import Holiday from "../../models/Holiday";

describe("HolidayDao", () => {
  const dao: HolidayDao = new HolidayDao();

  describe("all()", () => {
    let holidays!: Holiday[];
    beforeEach(() => {
      holidays = dao.all();
    });

    it("is expected return an array of Holiday", () => {
      for (const holiday of holidays) {
        expect(holiday).toBeInstanceOf(Holiday);
      }
    });

    it("is expected to have only valid dates", () => {
      for (const holiday of holidays) {
        expect(holiday.getDateHandler().isValid()).toBeTruthy();
      }
    });
  });
});
