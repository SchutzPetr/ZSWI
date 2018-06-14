import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Style from "./style/AgendaTabsStyle";
import {IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core/index";
import moment from "moment";
import MoreVert from "@material-ui/icons/MoreVert";
import AgendaEditModal from "./AgendaEditModal";
import TimeSheet from "../../entity/TimeSheet";
import Utils from "../../other/Utils";
import DayTimeSheet from "../../entity/DayTimeSheet";
import User from "../../entity/User";

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
                        {days.map((value, index) => {
                            const dayTimeSheet = dayTimeSheets[value.getDate()];

                            if (!dayTimeSheet) {
                                return (
                                    <TableRow key={`${index}-${value}`} className={this.getRowBackgroundColor(value)}>
                                        <TableCell
                                            className={classes.tableCell}>{moment(value).format("LL")}</TableCell>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={classes.tableCell}/>
                                        <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                            <IconButton className={classes.menuButton}
                                                        aria-label="Menu"
                                                        onClick={(event) => {
                                                            let data = new DayTimeSheet();
                                                            data.date = value;
                                                            this.handleOpenEdit(event, data);
                                                        }}>
                                                <MoreVert className={classes.moreVert}/>
                                            </IconButton></TableCell>
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
                                    <TableRow key={`${index}-${value}`} className={this.getRowBackgroundColor(value)}>
                                        <TableCell
                                            className={classes.tableCell}>{moment(value).format("LL")}</TableCell>
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
                                        <TableCell className={classes.tableCell}>{""}</TableCell>
                                        <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                            <IconButton className={classes.menuButton} aria-label="Menu"
                                                        onClick={(event) => {
                                                            this.handleOpenEdit(event, dayTimeSheet);
                                                        }}>
                                                <MoreVert className={classes.moreVert}/>
                                            </IconButton></TableCell>
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
    user: PropTypes.instanceOf(User)
};

export default withStyles(styles, {withTheme: true})(Agenda);