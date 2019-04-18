import express from "express";
import ResponseFormatter from "../utils/ResponseFormatter";

const workdaysRouter = express.Router();

workdaysRouter.get("/:startDate/:endDate", (req, res) => {
  res.json(ResponseFormatter.json(req.calendar.getWorkdays()));
});

export default workdaysRouter;
