import express from 'express';
import Calendar from '../models/Calendar';
import ResponseFormatter from '../utils/ResponseFormatter';

const holidaysRouter = express.Router();

holidaysRouter.get('/:startDate/:endDate', (req, res) => {
    const calendar: Calendar = new Calendar(req.params.startDate, req.params.endDate);
    res.json(ResponseFormatter.json(calendar.getHolidays()));
});

export default holidaysRouter;