import cors from "cors";
import express from "express";
import HttpErrorMiddleware, {
  NOT_FOUND,
} from "./middlewares/httpErrorMiddleware";
import swaggerMiddleware, {
  swaggerConfig,
} from "./middlewares/swaggerMiddleware";
import holidaysRouter from "./routes/holidays-router";
import periodRouter from "./routes/period-router";
import weekendsRouter from "./routes/weekends-router";
import workdaysRouter from "./routes/workdays-router";

const server = express();

server.use(cors());
server.use(
  /.*\/doc/,
  swaggerMiddleware.serve,
  swaggerMiddleware.setup(swaggerConfig),
);
server.use(/.*\/holidays/, holidaysRouter);
server.use(/.*\/weekends/, weekendsRouter);
server.use(/.*\/workdays/, workdaysRouter);
server.use(/.*\/period/, periodRouter);
server.all("/*", (_, __, next) => next(NOT_FOUND));
server.use(HttpErrorMiddleware);

export default server;
