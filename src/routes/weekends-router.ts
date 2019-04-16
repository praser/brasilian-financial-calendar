import express from "express";
import Calendar from "../models/Calendar";
import ResponseFormatter from "../utils/ResponseFormatter";

const weekendsRouter = express.Router();

weekendsRouter.get("/:startDate/:endDate", (req, res) => {
  const calendar: Calendar = new Calendar(
    req.params.startDate,
    req.params.endDate,
  );
  res.json(ResponseFormatter.json(calendar.getWeekends()));
});

export default weekendsRouter;
