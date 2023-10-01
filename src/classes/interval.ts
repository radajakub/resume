export class Interval {
    start: Date;
    end: Date;

    constructor(syear: number, smonth: number, sday: number, eyear: number, emonth: number, eday: number) {
        this.start = new Date(syear, smonth, sday);
        this.end = new Date(eyear, emonth, eday);
    }

    computePercentage(): number {
        const wholeInterval = this.end.getTime() - this.start.getTime();
        const currInterval = Date.now() - this.start.getTime();
        return Math.min(Math.round(currInterval * 100 / wholeInterval), 100);
    }
}
