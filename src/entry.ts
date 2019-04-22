import * as dotenv from "dotenv";
dotenv.config();

import config from "./config";
import server from "./server";

const port: number = parseInt(process.env.PORT || config.port, config.radix);
if (process.env.TZ === undefined) {
  process.env.TZ = config.tz;
}

server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`[SERVER] Running at http://localhost:${port}.`);
  // tslint:disable-next-line:no-console
  console.log(
    `[INFO] Please visit http://localhost:${port}/doc to see the service documentation.`,
  );
});
