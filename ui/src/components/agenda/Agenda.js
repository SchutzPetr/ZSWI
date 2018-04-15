import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import {IconButton, Menu, MenuItem, Paper} from "material-ui";
import moment from "moment";
import Utils from "../../other/Utils"
import MoreVert from "material-ui-icons/MoreVert";
import Fade from "material-ui/es/transitions/Fade";
import AgendaEditModal from "./AgendaEditModal";
import DayTimeSheet from "../../entity/DayTimeSheet";
import TimeSheet from "../../entity/TimeSheet";

const rowHeightHeader = 24;
const rowHeight = 20;

const styles = theme => ({
    root: {
        maxHeight: "calc(100vh - 115px)",
        height: "calc(100vh - 115px)",
        overflowX: "auto",
    },
    table: {
        minWidth: 700,
    },
    part: {
        borderBottom: "none",
        textAlign: "center",
        fontWeight: "bold",
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
        borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    centerHeaderText: {
        textAlign: "center",
    },
    saturday: {
        height: rowHeight,
        backgroundColor: "#dcbd31"
    },
    sunday: {
        height: rowHeight,
        backgroundColor: "#dc143c"
    },
    thuTue: {
        height: rowHeight,
        backgroundColor: "#fafafb"
    },
    defRow: {
        height: rowHeight,
    },
    headerBorder: {
        border: "1px solid rgba(224, 224, 224, 1)",
        textAlign: "center",
    },
    headerLeftRight: {
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
        borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    tableCell: {
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "none",
    },
    partTableCell: {
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "none",
        textAlign: "center",
    },
    moreVert: {
        height: 18,
        width: 18,
    },
    menuButton: {
        height: 20,
        width: 20,
    },
    tableCellMenu: {
        width: 32,
    },
    headerRow: {
        height: rowHeightHeader,
    }
});


class Agenda extends React.Component {

    state = {
        anchorEl: null,
        openEdit: false,
        rowData: null
    };

    handleOpenEdit(event, rowData) {
        this.setState({
            openEdit: true,
            rowData: rowData
        });
    }

    handleCloseEdit() {
        this.setState({openEdit: false, rowData: null});
    }

    handleOnSaveEdit = (data) =>{
        this.props.onTimeSheetEdit(data);
        this.handleCloseEdit();
    };

    getRowBackgroundColor(date) {
        if (date.getDay() === 6) {
            return this.props.classes.saturday;
        } else if (date.getDay() === 0) {
            return this.props.classes.sunday;
        } else if (date.getDay() === 2 || date.getDay() === 4) {
            return this.props.classes.thuTue;
        } else {
            return this.props.classes.defRow;
        }
    }

    render() {
        const {classes, timeSheet} = this.props;

        let dayTimeSheets = timeSheet.dayTimeSheets;

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.headerRow}>
                            <TableCell rowSpan={2} className={classes.centerHeaderText}>Datum</TableCell>
                            <TableCell colSpan={3} className={classes.part}>První část</TableCell>
                            <TableCell colSpan={3} className={classes.part}>Druhá část</TableCell>
                            <TableCell rowSpan={2} className={classes.centerHeaderText}>Typ</TableCell>
                            <TableCell rowSpan={2}/>
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
                        {Object.keys(dayTimeSheets).map((value, index) => {
                            if(dayTimeSheets[value].dayType === "SAT_SUN"){
                                return (
                                    <TableRow key={`${index}-${dayTimeSheets[value].date}`} className={this.getRowBackgroundColor(dayTimeSheets[value].date)}>
                                        <TableCell className={classes.tableCell}>{moment(dayTimeSheets[value].date).format("LL")}</TableCell>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                            <IconButton className={classes.menuButton} aria-label="Menu"
                                                        onClick={(event) => {
                                                            this.handleOpenEdit(event, dayTimeSheets[value]);
                                                        }}>
                                                <MoreVert className={classes.moreVert}/>
                                            </IconButton></TableCell>
                                    </TableRow>

                                );
                            }

                            const firstPartFrom = dayTimeSheets[value].firstPartFrom;
                            const firstPartTo = dayTimeSheets[value].firstPartTo;
                            const secondPartFrom = dayTimeSheets[value].secondPartFrom;
                            const secondPartTo = dayTimeSheets[value].secondPartTo;

                            const firstPartDiff = firstPartTo.diff(firstPartFrom, "hours", true);
                            const secondPartDiff = secondPartTo.diff(secondPartFrom, "hours", true);


                            return (
                                <TableRow key={`${index}-${dayTimeSheets[value].date}`} className={this.getRowBackgroundColor(dayTimeSheets[value].date)}>
                                    <TableCell className={classes.tableCell}>{moment(dayTimeSheets[value].date).format("LL")}</TableCell>
                                    <TableCell
                                        className={classes.partTableCell}>
                                        {firstPartFrom.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.partTableCell}>
                                        {firstPartTo.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.partTableCell}>
                                        {firstPartDiff + "h"}
                                    </TableCell>
                                    <TableCell
                                        className={classes.partTableCell}>
                                        {secondPartFrom.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.partTableCell}>
                                        {secondPartTo.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.partTableCell}>
                                        {secondPartDiff + "h"}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>{""}</TableCell>
                                    <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                        <IconButton className={classes.menuButton} aria-label="Menu"
                                                    onClick={(event) => {
                                                        this.handleOpenEdit(event, dayTimeSheets[value]);
                                                    }}>
                                            <MoreVert className={classes.moreVert}/>
                                        </IconButton></TableCell>
                                </TableRow>

                            );
                        })}
                    </TableBody>
                    <AgendaEditModal open={this.state.openEdit} dayTimeSheet={this.state.rowData} handleClose={this.handleCloseEdit.bind(this)} handleOnSave={this.handleOnSaveEdit}/>
                </Table>
            </Paper>
        );
    }
}

Agenda.propTypes = {
    classes: PropTypes.object.isRequired,
    timeSheet: PropTypes.instanceOf(TimeSheet),
    onTimeSheetEdit: PropTypes.func.isRequired
};

export default withStyles(styles, {withTheme: true})(Agenda);