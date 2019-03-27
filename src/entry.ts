import * as dotenv from 'dotenv';
import server from './server';

dotenv.config();

server.listen(process.env.PORT, () => {
    console.log(`[SERVER] Running at http://localhost:${process.env.PORT}`);
})