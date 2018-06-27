import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/UserProjectStyle";
import {Card, CardContent, CardHeader, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core/index";
import moment from "moment";
import TimeSheet from "../../entity/TimeSheet";
import DayTimeSheet from "../../entity/DayTimeSheet";
import User from "../../entity/User";

class UserProject extends React.Component {

    countSumOfHours() {
        let x = this.props.timeSheet.dayTimeSheets.map(dayTimeSheet => {
            if (!dayTimeSheet) {
                return 0;
            } else {
                let diff = 0;
                if (dayTimeSheet.firstPartFrom && dayTimeSheet.firstPartTo) {
                    diff += moment(dayTimeSheet.firstPartTo).diff(moment(dayTimeSheet.firstPartFrom), "hours", true);
                }
                if (dayTimeSheet.secondPartFrom && dayTimeSheet.secondPartTo) {
                    diff += moment(dayTimeSheet.secondPartTo).diff(moment(dayTimeSheet.secondPartFrom), "hours", true);
                }
                return diff;
            }
        });

        return x.reduce((a, b) => a + b, 0);
    }

    countSumOfPublicHolidayHours() {
        return this.props.timeSheet.publicHolidays.filter(holiday => holiday.date.getDay() !== 6 || holiday.date.getDay() !== 0).length * (40 * Number(this.props.user.currentUserContract.obligationKIV)) / 5
    }

    countSumOfHolidayHours() {
        let x = this.props.timeSheet.dayTimeSheets.map(dayTimeSheet => {
            if (dayTimeSheet.dayType === "HOLIDAY_FIRST_PART_OF_DAY" || dayTimeSheet.dayType === "HOLIDAY_SECOND_PART_OF_DAY") {
                return 0.5;
            } else if (dayTimeSheet.dayType === "HOLIDAY_ALL_DAY") {
                return 1;
            } else {
                return 0;
            }
        });

        return x.reduce((a, b) => a + b, 0) * (40 * Number(this.props.user.currentUserContract.obligationKIV)) / 5;
    }

    countSumOfFamilyMemberCareAndSickness() {
        return this.props.timeSheet.dayTimeSheets.filter(dayTimeSheet => dayTimeSheet.dayType === "SICKNESS" || dayTimeSheet.dayType === "FAMILY_MEMBER_CARE").length;
    }

    countFond() {
        let days = this.props.timeSheet.dayTimeSheets.map(dayTimeSheet => {
            if (dayTimeSheet.dayType === "HOLIDAY_FIRST_PART_OF_DAY" || dayTimeSheet.dayType === "HOLIDAY_SECOND_PART_OF_DAY") {
                return 0.5;
            } else if (UserProject.isWorkingDay(dayTimeSheet)) {
                let x = 0;
                if (dayTimeSheet.firstPartFrom !== null && dayTimeSheet.firstPartTo !== null) {
                    x += 0.5;
                }
                if (dayTimeSheet.secondPartFrom !== null && dayTimeSheet.secondPartTo !== null) {
                    x += 0.5;
                }
                return x;
            } else {
                return 0;
            }
        });

        return days.reduce((a, b) => a + b, 0) * (40 * Number(this.props.user.currentUserContract.obligationKIV)) / 5;
    }

    /**
     * SICKNESS: "Nemoc",
     FAMILY_MEMBER_CARE: "OČR",
     HOLIDAY: "Dovolená",
     PUBLIC_HOLIDAY: "Státní svátek",
     BUSINESS_TRIP: "Služební cesta",
     WORK_OUTSIDE_WORKSPACE: "Práce mimo pracoviště",
     * @param {DayTimeSheet}dayTimeSheet
     */
    static isWorkingDay(dayTimeSheet) {
        return !(dayTimeSheet.date.getDay() === 6 ||
            dayTimeSheet.date.getDay() === 0 ||
            dayTimeSheet.dayType === "HOLIDAY_ALL_DAY" ||
            dayTimeSheet.dayType === "PUBLIC_HOLIDAY");
    }

    render() {

        if (!this.props.timeSheet) {
            return <Card className={this.props.rootClass ? this.props.rootClass : this.props.classes.root}/>;
        }

        let sum = this.countSumOfHours();
        let sumPublicHoliday = this.countSumOfPublicHolidayHours();
        let sumHoliday = this.countSumOfHolidayHours();
        let sumFamilyMemberCareAndSickness = this.countSumOfFamilyMemberCareAndSickness();
        let userDay = (40 * Number(this.props.user.currentUserContract.obligationKIV)) / 5;
        let sumFond = this.countFond();

        return (
            <Card className={this.props.rootClass ? this.props.rootClass : this.props.classes.root}>
                <CardHeader title={"Souhrn"}/>
                <CardContent className={this.props.classes.content}>
                    <Table className={""}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Název projektu</TableCell>
                                <TableCell className={this.props.classes.titleCell2Header}>Celkem</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2Header}>{value.project.projectNameShort}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Celkem odpracováno hodin"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round((sum) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{(Math.round((sum * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Fond prac. doby za státní svátky"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round((sumPublicHoliday) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{(Math.round((sumPublicHoliday * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Celkem se státními svátky"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round((sumPublicHoliday + sum) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{((Math.round((sumPublicHoliday + sum) * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Dovolená přepočtená na hodiny"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round((sumHoliday) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{(Math.round((sumHoliday * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Celkem se státními svátky i dovolenou"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round(((sumPublicHoliday + sumHoliday + sum)) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{(Math.round(((sumPublicHoliday + sumHoliday + sum) * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Nemocenská, OČR (počet dnů)"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round((sumFamilyMemberCareAndSickness) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{(Math.round((sumFamilyMemberCareAndSickness * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Nemocenská, OČR (přepočteno na hodiny)"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round(((sumFamilyMemberCareAndSickness * userDay)) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{(Math.round(((sumFamilyMemberCareAndSickness * userDay) * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.titleCell}>{"Celkem disponibilní fond bez přestávek"}</TableCell>
                                <TableCell
                                    className={this.props.classes.titleCell2}>{(Math.round((sumFond) * 100) / 100)}</TableCell>
                                {this.props.timeSheet.projectAssign.map((value) => {
                                    return <TableCell
                                        className={this.props.classes.titleCell2}>{(Math.round((sumFond * Number(value.obligation)) * 100) / 100)}</TableCell>
                                })}
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
}

UserProject.propTypes = {
    classes: PropTypes.object.isRequired,
    rootClass: PropTypes.any,
    paper: PropTypes.bool,
    user: PropTypes.instanceOf(User),
    timeSheet: PropTypes.instanceOf(TimeSheet)
};

export default withStyles(Styles, {withTheme: true})(UserProject);