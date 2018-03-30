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
}
export {Utils};
export default Utils;