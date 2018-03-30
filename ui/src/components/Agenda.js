import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Table, {TableBody, TableCell, TableHead, TableRow} from "material-ui/Table";
import {IconButton, Menu, MenuItem, Paper} from "material-ui";
import moment from "moment";
import Utils from "./../other/Utils"
import MoreVert from "material-ui-icons/MoreVert";
import Fade from "material-ui/es/transitions/Fade";

const rowHeight = 24;

const styles = theme => ({
    root: {
        maxHeight: "calc(100vh - 160px)",
        height: "calc(100vh - 160px)",
        overflowX: "auto",
    },
    table: {
        minWidth: 700,
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
    tableCell: {
        borderBottom: "none",
    },
    moreVert: {
        height: 22,
        width: 22,
    },
    menuButton: {
        height: 24,
        width: 24,
    },
    tableCellMenu: {
        width: 32,
    }
});


class Agenda extends React.Component {

    state = {
        anchorEl: null,
    };

    getRowBackgroundColor(date){
        if(date.getDay() === 6){
            return this.props.classes.saturday;
        } else if (date.getDay() === 0){
            return this.props.classes.sunday;
        } else if (date.getDay() === 2 || date.getDay() === 4){
            return this.props.classes.thuTue;
        } else{
            return this.props.classes.defRow;
        }
    }

    handleOpenMenu(event){
        debugger;
        this.setState({anchorEl: event.currentTarget});
    }

    handleCloseMenu(){
        this.setState({anchorEl: null});
    }

    render() {
        const {classes} = this.props;

        let days = Utils.getDaysInMonth(this.props.date.getMonth(), this.props.date.getFullYear()) || [];

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Od</TableCell>
                            <TableCell>Do</TableCell>
                            <TableCell>Od</TableCell>
                            <TableCell>Do</TableCell>
                            <TableCell>Typ</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {days.map((value, index) => {
                            return (
                                <TableRow key={`${index}-${value}`} className={this.getRowBackgroundColor(value)}>
                                    <TableCell className={classes.tableCell}>{moment(value).format("LL")}</TableCell>
                                    <TableCell className={classes.tableCell}>{moment(value).hour(8).minute(0).second(0).format("H:mm")}</TableCell>
                                    <TableCell className={classes.tableCell}>{moment(value).hour(12).minute(0).second(0).format("H:mm")}</TableCell>
                                    <TableCell className={classes.tableCell}>{moment(value).hour(12).minute(30).second(0).format("H:mm")}</TableCell>
                                    <TableCell className={classes.tableCell}>{moment(value).hour(16).minute(30).second(0).format("H:mm")}</TableCell>
                                    <TableCell className={classes.tableCell}>{""}</TableCell>
                                    <TableCell className={`${classes.tableCell} ${classes.tableCellMenu}`}>
                                        <IconButton className={classes.menuButton} aria-label="Menu" onClick={this.handleOpenMenu.bind(this)}>
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
                        <MenuItem onClick={this.handleCloseMenu.bind(this)}>Profile</MenuItem>
                        <MenuItem onClick={this.handleCloseMenu.bind(this)}>My account</MenuItem>
                        <MenuItem onClick={this.handleCloseMenu.bind(this)}>Logout</MenuItem>
                    </Menu>
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