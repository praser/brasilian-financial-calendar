import * as dotenv from 'dotenv';
import server from './server';
import Calendar from './models/Calendar';

dotenv.config();

server.listen(process.env.PORT, () => {
    console.log(`[SERVER] Running at http://localhost:${process.env.PORT}`);
    const calendar: Calendar = new Calendar(new Date('2019-01-01'), new Date('2019-01-31'));
    console.log(calendar.getWeekends());

})