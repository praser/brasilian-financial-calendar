import express from "express";
import Calendar from "../models/Calendar";

const calendarRouter = express.Router();

calendarRouter.get("/:startDate/:endDate", (req, _, next) => {
  req.calendar = new Calendar(req.params.startDate, req.params.endDate);

  next();
});

export default calendarRouter;
