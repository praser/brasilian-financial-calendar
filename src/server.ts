import express from 'express';
import periodRouter from './routes/period-router';
import holidaysRouter from './routes/holidays-router';
import weekendsRouter from './routes/weekends-router';
import workdaysRouter from './routes/workdays-router';

const server = express();

server.use('/', periodRouter);
server.use('/holidays', holidaysRouter);
server.use('/weekends', weekendsRouter);
server.use('/workdays', workdaysRouter);

export default server;