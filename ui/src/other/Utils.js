import UserTimeSheets from "../entity/UserTimeSheets";
import TimeSheet from "../entity/TimeSheet";
import DayTimeSheet from "../entity/DayTimeSheet";
import moment from "moment/moment";

class Utils {

    static getDaysInMonth(month, year){
        let date = new Date(year, month, 1);
        const days = [];

        while (date.getMonth() === month){
            days.push(new Date(date));
            date.setDate(date.getDate() + 1)
        }

        return days;
    }

    static generateMockData(month, year, ntis){
        const days = Utils.getDaysInMonth(month, year) || [];

        let dayTimeSheets = {};

        days.map((value, index) => {
            const firstPartFrom = moment(value).hour(8).minute(15).second(0);
            const firstPartTo = moment(value).hour(12).minute(0).second(0);
            const secondPartFrom = moment(value).hour(12).minute(30).second(0);
            const secondPartTo = moment(value).hour(16).minute(30).second(0);

            //saturday=6||sunday=0
            if (value.getDay() === 6 || value.getDay() === 0) {
                dayTimeSheets[value.getDate().toString()] = new DayTimeSheet(value, "SAT_SUN");
            } else {
                dayTimeSheets[value.getDate().toString()] = new DayTimeSheet(value, null, firstPartFrom, firstPartTo, null, secondPartFrom, secondPartTo, null);
            }
        });

        return new TimeSheet(month, ntis, dayTimeSheets);
    }
}
export {Utils};
export default Utils;