export class User {
    constructor(calendar, years, currentYear) {
        this.calendar = calendar;
        this.years = years;
        this.weeks = calendar.weeks;
        this.days = [];
        this.currentYear = currentYear;
        this.weeks.forEach(week => {
            week["contributionDays"].forEach(day =>{
                this.days.push(day);
            })
        });

    }
}
