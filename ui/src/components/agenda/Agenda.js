import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Style from "./style/AgendaStyle";
import {IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core/index";
import moment from "moment";
import MoreVert from "@material-ui/icons/MoreVert";
import AgendaEditModal from "./AgendaEditModal";
import TimeSheet from "../../entity/TimeSheet";
import Utils from "../../other/Utils";
import DayTimeSheet from "../../entity/DayTimeSheet";
import User from "../../entity/User";

const dayTypes = {
    SICKNESS: "Nemoc",
    FAMILY_MEMBER_CARE: "OČR",
    HOLIDAY: "Dovolená",
    PUBLIC_HOLIDAY: "Státní svátek",
    BUSINESS_TRIP: "Služební cesta",
    WORK_OUTSIDE_WORKSPACE: "Práce mimo pracoviště",
    HOLIDAY_FIRST_PART_OF_DAY: "Dovolená",
    HOLIDAY_SECOND_PART_OF_DAY: "Dovolená",
    HOLIDAY_ALL_DAY: "Dovolená",
};

class Agenda extends React.Component {

    constructor(props) {
        super(props);

        this.state = Agenda.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            rowData: null
        };
    }

    handleOpenEdit(event, rowData) {
        this.setState({
            openEdit: true,
            rowData: rowData
        });
    }

    handleCloseEdit() {
        this.setState({openEdit: false, rowData: null});
    }

    handleOnSaveEdit = (data) => {
        this.props.onTimeSheetEdit(data);
        this.handleCloseEdit();
    };

    getRowBackgroundColor(date, holiday) {
        if (holiday) {
            return this.props.classes.holiday;
        } else if (date.getDay() === 6) {
            return this.props.classes.saturday;
        } else if (date.getDay() === 0) {
            return this.props.classes.sunday;
        } else if (date.getDay() === 2 || date.getDay() === 4) {
            return this.props.classes.thuTue;
        } else {
            return this.props.classes.defRow;
        }
    }

    static getDayType1(dayTimeSheet, holiday) {
        let dayType = dayTimeSheet.dayType;

        if (dayType === "SICKNESS" || dayType === "FAMILY_MEMBER_CARE" || dayType === "PUBLIC_HOLIDAY") {
            return holiday ? holiday.name : dayTypes[dayType];
        } else if (dayType === "HOLIDAY_FIRST_PART_OF_DAY" || dayType === "HOLIDAY_SECOND_PART_OF_DAY" || dayType === "HOLIDAY_ALL_DAY") {
            return dayTypes["HOLIDAY"];
        } else {
            return null;
        }
    }

    static getDayType2(dayTimeSheet, holiday) {
        let dayType = dayTimeSheet.dayType;

        if (dayType === "BUSINESS_TRIP" || dayType === "WORK_OUTSIDE_WORKSPACE") {
            return dayTypes[dayType];
        } else {
            return null;
        }
    }

    render() {

        const {classes, timeSheet} = this.props;

        const days = Utils.getDaysInMonth(timeSheet.month, timeSheet.year);
        const dayTimeSheets = timeSheet.dayTimeSheets;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.headerRow}>
                            <TableCell rowSpan={2} className={classes.centerHeaderText}>Datum</TableCell>
                            <TableCell colSpan={3} className={classes.part}>První část</TableCell>
                            <TableCell colSpan={3} className={classes.part}>Druhá část</TableCell>
                            <TableCell rowSpan={2} className={classes.centerHeaderText}>Nemoc, OČR, Dovolená, Státní
                                svátek</TableCell>
                            <TableCell rowSpan={2} className={classes.centerHeaderText}>Služ. cesta, Práce mimo
                                pracoviště</TableCell>
                            {this.props.mode === "USER" ? null : <TableCell rowSpan={2}/>}
                        </TableRow>
                        <TableRow className={classes.headerRow}>
                            <TableCell className={classes.headerBorder}>Od</TableCell>
                            <TableCell className={classes.headerBorder}>Do</TableCell>
                            <TableCell className={classes.headerBorder}>T</TableCell>
                            <TableCell className={classes.headerBorder}>Od</TableCell>
                            <TableCell className={classes.headerBorder}>Do</TableCell>
                            <TableCell className={classes.headerBorder}>T</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {days.map((value, index) => {
                            const dayTimeSheet = dayTimeSheets[value.getDate()];

                            const holiday = this.props.timeSheet.publicHolidays.find(valueH => value.getFullYear() === valueH.date.getFullYear() && value.getMonth() === valueH.date.getMonth() && value.getDate() === valueH.date.getDate())

                            if (!dayTimeSheet) {
                                return (
                                    <TableRow key={`${index}-${value}`}
                                              className={this.getRowBackgroundColor(value, holiday)}>
                                        <TableCell
                                            className={classes.tableCell}>{moment(value).format("LL")}</TableCell>
                                        <TableCell className={classes.tableCellDate}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell
                                            className={classes.tableCell}>{holiday ? holiday.name : ""}</TableCell>
                                        <TableCell className={classes.tableCell}/>
                                        {this.props.mode === "USER" ? null :
                                            <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                                <IconButton className={classes.menuButton}
                                                            aria-label="Menu"
                                                            onClick={(event) => {
                                                                let data = new DayTimeSheet();
                                                                data.date = value;
                                                                this.handleOpenEdit(event, data);
                                                            }}>
                                                    <MoreVert className={classes.moreVert}/>
                                                </IconButton>
                                            </TableCell>
                                        }
                                    </TableRow>

                                );
                            } else {
                                const firstPartFrom = moment(dayTimeSheet.firstPartFrom);
                                const firstPartTo = moment(dayTimeSheet.firstPartTo);
                                const secondPartFrom = moment(dayTimeSheet.secondPartFrom);
                                const secondPartTo = moment(dayTimeSheet.secondPartTo);

                                const firstPartDiff = dayTimeSheet.firstPartFrom && dayTimeSheet.firstPartTo ? firstPartTo.diff(firstPartFrom, "hours", true) : null;
                                const secondPartDiff = dayTimeSheet.secondPartFrom && dayTimeSheet.secondPartTo ? secondPartTo.diff(secondPartFrom, "hours", true) : null;

                                return (
                                    <TableRow key={`${index}-${value}`}
                                              className={this.getRowBackgroundColor(value, holiday)}>
                                        <TableCell
                                            className={classes.tableCellDate}>{moment(value).format("LL")}</TableCell>
                                        <TableCell className={classes.partTableCell}>
                                            {dayTimeSheet.firstPartFrom ? firstPartFrom.format("H:mm") : null}
                                        </TableCell>
                                        <TableCell className={classes.partTableCell}>
                                            {dayTimeSheet.firstPartTo ? firstPartTo.format("H:mm") : null}
                                        </TableCell>
                                        <TableCell className={classes.partTableCell}>
                                            {firstPartDiff ? firstPartDiff + "h" : null}
                                        </TableCell>
                                        <TableCell className={classes.partTableCell}>
                                            {dayTimeSheet.secondPartFrom ? secondPartFrom.format("H:mm") : null}
                                        </TableCell>
                                        <TableCell className={classes.partTableCell}>
                                            {dayTimeSheet.secondPartTo ? secondPartTo.format("H:mm") : null}
                                        </TableCell>
                                        <TableCell className={classes.partTableCell}>
                                            {secondPartDiff ? secondPartDiff + "h" : null}
                                        </TableCell>
                                        <TableCell
                                            className={classes.partTableCell}>{Agenda.getDayType1(dayTimeSheet, holiday)}</TableCell>
                                        <TableCell
                                            className={classes.partTableCell}>{Agenda.getDayType2(dayTimeSheet, holiday)}</TableCell>
                                        {this.props.mode === "USER" ? null :
                                            <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                                <IconButton className={classes.menuButton} aria-label="Menu"
                                                            onClick={(event) => {
                                                                this.handleOpenEdit(event, dayTimeSheet);
                                                            }}>
                                                    <MoreVert className={classes.moreVert}/>
                                                </IconButton>
                                            </TableCell>
                                        }
                                    </TableRow>

                                );
                            }

                        })}
                    </TableBody>
                    <AgendaEditModal user={this.props.user} open={this.state.openEdit} dayTimeSheet={this.state.rowData}
                                     handleClose={this.handleCloseEdit.bind(this)}
                                     handleOnSave={this.handleOnSaveEdit}/>
                </Table>
            </Paper>
        );
    }
}

Agenda.propTypes = {
    classes: PropTypes.object.isRequired,
    timeSheet: PropTypes.instanceOf(TimeSheet),
    onTimeSheetEdit: PropTypes.func.isRequired,
    user: PropTypes.instanceOf(User),
    mode: PropTypes.string
};
Agenda.defaultProps = {
    mode: "USER",
};

export default withStyles(Style, {withTheme: true})(Agenda);