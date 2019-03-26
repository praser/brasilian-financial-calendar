import Holiday from './Holiday';

class Calendar {
    private days: Array<Date> = new Array<Date>();
    private holidays: Array<Date> = new Array<Date>();
    private weekends: Array<Date> = new Array<Date>();

    public constructor(startDate: Date, endDate: Date) {
        this.setDays(startDate, endDate);
        this.setHolidays(startDate, endDate);
        this.setWeekends();
    }

    private setDays(startDate: Date, endDate: Date): void {
        let dateIndex: Date = new Date(startDate);
        while (dateIndex <= endDate) {
            this.days.push(new Date(dateIndex));
            dateIndex.setDate(dateIndex.getDate() + 1);
        }
    }

    public getDays(): Array<Date> {
        return this.days;
    }

    private setHolidays(startDate: Date, endDate: Date): void {
        const holiday = new Holiday();
        this.holidays = holiday.getHolidays().filter((h: Date) => {
            return h >= startDate && h <= endDate;
        });
    }

    public getHolidays(): Array<Date> {
        return this.holidays;
    }

    private setWeekends(): void {
        const weekends = [0, 6];
        
        for (const day of this.days) {
            if (weekends.includes(day.getDay())) this.weekends.push(day);
        }
    }

    public getWeekends(): Array<Date> {
        return this.weekends;
    }
}

export default Calendar;