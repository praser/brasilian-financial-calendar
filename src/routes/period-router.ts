import express from "express";
import ResponseFormatter from "../utils/ResponseFormatter";

const periodRouter = express.Router();

periodRouter.get("/:startDate/:endDate", (req, res) => {
  res.json(ResponseFormatter.json(req.calendar.getPeriod()));
});

export default periodRouter;
