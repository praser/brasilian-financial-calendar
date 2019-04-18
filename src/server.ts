import cors from "cors";
import express from "express";
import HttpErrorMiddleware, {
  NOT_FOUND,
} from "./middlewares/httpErrorMiddleware";
import Calendar from "./models/Calendar";
import calendarRouter from "./routes/calendar-router";
import holidaysRouter from "./routes/holidays-router";
import periodRouter from "./routes/period-router";
import weekendsRouter from "./routes/weekends-router";
import workdaysRouter from "./routes/workdays-router";

declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    interface Request {
      calendar?: Calendar;
    }
  }
}

const server = express();

server.use(cors());
server.use(/.*\/holidays/, calendarRouter, holidaysRouter);
server.use(/.*\/weekends/, calendarRouter, weekendsRouter);
server.use(/.*\/workdays/, calendarRouter, workdaysRouter);
server.use(/.*\/period/, calendarRouter, periodRouter);
server.all("/*", (_, __, next) => next(NOT_FOUND));
server.use(HttpErrorMiddleware);

export default server;
