import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Tooltip
} from '@material-ui/core/index';
import Styles from "./style/HolidayTableStyle";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import EnhancedTableHead from "./components/EnhancedTableHead";
import HolidayRowRecord from "../../entity/HolidayRowRecord";
import moment from "moment/moment";
import EditIcon from "@material-ui/icons/es/Edit";

class HolidayTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            order: 'asc',
            orderBy: 'calories',
            selected: [],
            page: 0,
            rowsPerPage: props.rowsPerPage || 5,
            holidayCreateModal: false
        };
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        const data =
            order === 'desc'
                ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

        this.setState({data, order, orderBy});
    };


    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    onSelectChange = (event, item, value) => {
        this.props.onSelectChange(item, value);
    };

    onSelectAllChange = (value) => {
        this.props.onSelectAllChange(value);
    };

    onDeleteSelected = () => {

    };

    render() {
        const {classes} = this.props;
        const {rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);

        const numSelected = this.props.data.filter(value => value.isSelected).length;

        return (
            <Paper className={this.props.fullHeight ? classes.fullHeightRoot : classes.root}>
                <EnhancedTableToolbar numSelected={numSelected}
                                      onDeleteSelected={this.onDeleteSelected}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead
                            numSelected={numSelected}
                            onSelectAllChange={this.onSelectAllChange}
                            rowCount={this.props.data.length}
                        />
                        <TableBody>
                            {this.props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(values => {
                                return (
                                    <TableRow
                                        hover={true}
                                        role={"checkbox"}
                                        aria-checked={values.isSelected}
                                        tabIndex={-1}
                                        key={`holiday_row_${values.id}`}
                                        selected={values.isSelected}
                                    >
                                        <TableCell padding={"checkbox"}
                                                   onClick={event => this.onSelectChange(event, values, !values.isSelected)}>
                                            <Checkbox checked={values.isSelected}/>
                                        </TableCell>
                                        <TableCell
                                            onClick={event => this.onSelectChange(event, values, !values.isSelected)}
                                            padding="none">{moment(values.date).format("LL")}</TableCell>
                                        <TableCell
                                            onClick={event => this.onSelectChange(event, values, !values.isSelected)}>{values.type}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Editace">
                                                <IconButton aria-label="Editace">
                                                    <EditIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 57 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component={"div"}
                    count={this.props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    rowsPerPageOptions={this.props.rowsPerPageOptions}
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

HolidayTable.propTypes = {
    classes: PropTypes.object,
    fullHeight: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    onSelectChange: PropTypes.func.isRequired,
    onSelectAllChange: PropTypes.func.isRequired,
    onDeleteSelected: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(HolidayRowRecord).isRequired,
    rowsPerPageOptions: PropTypes.array,
};
HolidayTable.defaultProps = {
    rowsPerPageOptions: [5, 10, 25]
};
export default withStyles(Styles, {withTheme: true})(HolidayTable);