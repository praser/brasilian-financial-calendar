import * as health from "@cloudnative/health-connect";
import cors from "cors";
import express, { Request, Response } from "express";
import morgan from "morgan";
import HttpErrorMiddleware, {
  NOT_FOUND,
} from "./middlewares/httpErrorMiddleware";
import Calendar from "./models/Calendar";
import calendarRouter from "./routes/calendar-router";
import router from "./routes/router";

declare global {
  namespace Express {
    // tslint:disable-next-line:interface-name
    interface Request {
      calendar?: Calendar;
    }
  }
}

const server = express();
const healthcheck = new health.HealthChecker();

server.use(cors());
server.use(
  morgan("combined", {
    skip: (req: Request, res: Response) =>
      req.baseUrl.match(/.*\/health/) ? true : false,
  }),
);
server.use(/.*\/health/, health.LivenessEndpoint(healthcheck));
server.use(/.*\/(holidays|weekends|workdays|period)/, calendarRouter, router);
server.all("/*", (_, __, next) => next(NOT_FOUND));
server.use(HttpErrorMiddleware);

export default server;
