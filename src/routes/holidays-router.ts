import express from "express";
import ResponseFormatter from "../utils/ResponseFormatter";

const holidaysRouter = express.Router();

holidaysRouter.get("/:startDate/:endDate", (req, res) => {
  res.json(ResponseFormatter.json(req.calendar.getHolidays()));
});

export default holidaysRouter;
