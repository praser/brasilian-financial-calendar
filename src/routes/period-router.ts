import express from 'express';
import Calendar from '../models/Calendar';
import ResponseFormatter from '../utils/ResponseFormatter';

const periodRouter = express.Router();

periodRouter.get('/:startDate/:endDate', (req, res) => {
    const calendar: Calendar = new Calendar(req.params.startDate, req.params.endDate);
    res.json(ResponseFormatter.json(calendar.getPeriod()));
});

export default periodRouter;