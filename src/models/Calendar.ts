import config from '../config';
import Holiday from './Holiday';
import { Moment } from 'moment-timezone';
import DateUtil from '../utils/DateUtil';

class Calendar {
    private readonly dateFormat: string = `${process.env.DATE_FORMAT || config.dateFormat}`;

    private period: Array<Moment> = new Array<Moment>();
    private holidays: Array<Moment> = new Array<Moment>();
    private weekends: Array<Moment> = new Array<Moment>();
    private startMoment!: Moment;
    private endMoment!: Moment;

    public constructor(startMoment: string, endMoment: string) {
        this.startMoment = DateUtil.parseMomentFromString(startMoment);
        this.endMoment = DateUtil.parseMomentFromString(endMoment);

        this.serPeriod();
        this.setHolidays();
        this.setWeekends();
    }

    private serPeriod(): void {
        let indexMoment: Moment = this.startMoment.clone();
        while (indexMoment.isSameOrBefore(this.endMoment, 'day')) {
            this.period.push(indexMoment.clone());
            indexMoment.add(1, 'day');
        }
    }

    public getPeriod(): Array<Moment> {
        return this.period;
    }

    private setHolidays(): void {
        const holiday = new Holiday();
        this.holidays = holiday.getHolidays().filter((h: Moment) => {
            return h.isBetween(this.startMoment, this.endMoment, 'day');
        });
    }

    public getHolidays(): Array<Moment> {
        return this.holidays;
    }

    private setWeekends(): void {
        const weekends = [0, 6];
        
        for (const day of this.period) {
            if (weekends.includes(day.weekday())) this.weekends.push(day.clone());
        }
    }

    public getWeekends(): Array<Moment> {
        return this.weekends;
    }

    public getWorkdays(): Array<Moment> {
        const weekends: Array<string> = this.convertMomentArrayToStringArray(this.weekends);
        const holidays: Array<string> = this.convertMomentArrayToStringArray(this.holidays);

        return this.period.filter(moment => {
            return !weekends.includes(moment.format(this.dateFormat)) && !holidays.includes(moment.format(this.dateFormat));
        });
    }

    public convertMomentArrayToStringArray(momentArray: Array<Moment>): Array<string> {
        return momentArray.map(moment => moment.format(this.dateFormat));
    }
}

export default Calendar;