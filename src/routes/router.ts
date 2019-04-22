import express from "express";
import DateHandler from "../models/DateHandler";
import ResponseFormatter from "../utils/ResponseFormatter";

const router = express.Router();
const routesRegex: RegExp = /.*\/(holidays|weekends|workdays|period)/;

router.get("/:startDate/:endDate", (req, res) => {
  let dateHandlerCollection: DateHandler[];
  const path: string = req.baseUrl.match(routesRegex)[1];

  switch (path) {
    case "holidays":
      dateHandlerCollection = req.calendar.getHolidays();
      break;
    case "weekends":
      dateHandlerCollection = req.calendar.getWeekends();
      break;
    case "workdays":
      dateHandlerCollection = req.calendar.getWorkdays();
      break;
    case "period":
      dateHandlerCollection = req.calendar.getPeriod();
      break;
  }
  res.json(ResponseFormatter.json(dateHandlerCollection));
});

export { routesRegex };
export default router;
