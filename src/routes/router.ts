import express from "express";
import { Moment } from "moment";
import ResponseFormatter from "../utils/ResponseFormatter";

const router = express.Router();
const routesRegex: RegExp = /.*\/(holidays|weekends|workdays|period)/;

router.get("/:startDate/:endDate", (req, res) => {
  let momentList: Moment[];
  const path: string = req.baseUrl.match(routesRegex)[1];

  switch (path) {
    case "holidays":
      momentList = req.calendar.getHolidays();
      break;
    case "weekends":
      momentList = req.calendar.getWeekends();
      break;
    case "workdays":
      momentList = req.calendar.getWorkdays();
      break;
    case "period":
      momentList = req.calendar.getPeriod();
      break;
  }
  res.json(ResponseFormatter.json(momentList));
});

export { routesRegex };
export default router;
