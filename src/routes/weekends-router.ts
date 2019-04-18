import express from "express";
import ResponseFormatter from "../utils/ResponseFormatter";

const weekendsRouter = express.Router();

weekendsRouter.get("/:startDate/:endDate", (req, res) => {
  res.json(ResponseFormatter.json(req.calendar.getWeekends()));
});

export default weekendsRouter;
