import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import {IconButton, Menu, MenuItem, Paper} from "material-ui";
import moment from "moment";
import Utils from "./../other/Utils"
import MoreVert from "material-ui-icons/MoreVert";
import Fade from "material-ui/es/transitions/Fade";
import AgendaEditModal from "./AgendaEditModal";

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
        this.setState({openEdit: false});
    }

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

    handleOpenMenu(event, rowData) {
        this.setState({anchorEl: event.currentTarget});
    }

    handleCloseMenu() {
        this.setState({anchorEl: null});
    }

    render() {
        const {classes} = this.props;

        let days = Utils.getDaysInMonth(this.props.date.getMonth(), this.props.date.getFullYear()) || [];

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
                            const firstPartFrom = moment(value).hour(8).minute(15).second(0);
                            const firstPartTo = moment(value).hour(12).minute(0).second(0);
                            const secondPartFrom = moment(value).hour(12).minute(30).second(0);
                            const secondPartTo = moment(value).hour(16).minute(30).second(0);

                            const firstPartDiff = firstPartTo.diff(firstPartFrom, "hours", true);
                            const secondPartDiff = secondPartTo.diff(secondPartFrom, "hours", true);


                            return (
                                <TableRow key={`${index}-${value}`} className={this.getRowBackgroundColor(value)}>
                                    <TableCell className={classes.tableCell}>{moment(value).format("LL")}</TableCell>
                                    <TableCell
                                        className={classes.tableCell}>
                                        {firstPartFrom.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}>
                                        {firstPartTo.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}>
                                        {firstPartDiff + "h"}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}>
                                        {secondPartFrom.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}>
                                        {secondPartTo.format("H:mm")}
                                    </TableCell>
                                    <TableCell
                                        className={classes.tableCell}>
                                        {secondPartDiff + "h"}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>{""}</TableCell>
                                    <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                        <IconButton className={classes.menuButton} aria-label="Menu"
                                                    onClick={(event) => {
                                                        this.handleOpenEdit(event, value);
                                                    }}>
                                            <MoreVert className={classes.moreVert}/>
                                        </IconButton></TableCell>
                                </TableRow>

                            );
                        })}
                    </TableBody>
                    <Menu
                        id="fade-menu"
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleCloseMenu.bind(this)}
                        transition={Fade}
                    >
                        <MenuItem onClick={this.handleCloseMenu.bind(this)}>Editovat výkaz</MenuItem>
                        <MenuItem onClick={this.handleCloseMenu.bind(this)}>My account</MenuItem>
                        <MenuItem onClick={this.handleCloseMenu.bind(this)}>Logout</MenuItem>
                    </Menu>
                    <AgendaEditModal open={this.state.openEdit} handleClose={this.handleCloseEdit.bind(this)}/>
                </Table>
            </Paper>
        );
    }
}

Agenda.propTypes = {
    classes: PropTypes.object.isRequired,
    date: PropTypes.instanceOf(Date),
};

export default withStyles(styles)(Agenda);