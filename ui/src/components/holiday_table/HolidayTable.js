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
    Tooltip,
} from '@material-ui/core/index';
import Styles from "./style/HolidayTableStyle";
import EnhancedTableToolbar from "./components/EnhancedTableToolbar";
import EnhancedTableHead from "./components/EnhancedTableHead";
import HolidayRowRecord from "../../entity/HolidayRowRecord";
import moment from "moment/moment";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import User from "../../entity/User";
import LinearProgressCentered from "../LinearProgressCentered";
import Calls from "../../Calls";
import HolidayCreateModal from "../holiday_create_modal/HolidayCreateModal";
import ConfirmationDialog from "../confirm/ConfirmationDialog";

const holidayTypes = {
    FIRST_PART_OF_DAY: "Dovolená první část dne",
    SECOND_PART_OF_DAY: "Dovolená druhá část dne",
    ALL_DAY: "Dovolená celý den",
};

class HolidayTable extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            selected: [],
            page: 0,
            rowsPerPage: props.rowsPerPage || 5,
            loadFeedback: "ready",
            modalOpen: false,
            modalData: null,
            openConfirmValue: null,
            openConfirm: false
        };
    }

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

    onDeleteSelected = (userHolidays) => {
        Calls.deleteUserHoliday({
            data: {id: userHolidays.id},
            done: this.props.onSaveDone,
            fail: this.props.onSaveDone,
        });
        this.setState({openConfirm: false, openConfirmValue: null});
    };

    handleCloseHolidayCreateModal = () => {
        this.setState({modalOpen: false, modalData: null});
    };

    handleOpenHolidayCreateModal = () => {
        this.setState({modalOpen: true});
    };

    handleOpenEdit = modalData => event => {
        this.setState({
            modalOpen: true,
            modalData: modalData
        });
    };

    _handleSaveHolidayCreateModal = (userHolidays, edit) => {
        if (edit) {
            Calls.updateUserHoliday({
                data: userHolidays,
                done: this.props.onSaveDone,
                fail: this.props.onSaveDone,
            });
        } else {
            Calls.createUserHoliday({
                data: userHolidays,
                done: this.props.onSaveDone,
                fail: this.props.onSaveDone,
            });
        }
    };

    render() {
        const {classes} = this.props;
        const {rowsPerPage, page} = this.state;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.data.length - page * rowsPerPage);
        const numSelected = this.props.data.filter(value => value.isSelected).length;

        return (
            <Paper className={this.props.fullHeight ? classes.fullHeightRoot : classes.root}>
                <EnhancedTableToolbar numSelected={numSelected}
                                      onDeleteSelected={this.onDeleteSelected}
                                      handleOpenHolidayCreateModal={this.handleOpenHolidayCreateModal}
                                      user={this.props.user}
                                      year={this.props.year}
                                      users={this.props.users}
                                      mode={this.props.mode}
                />
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
                                            onClick={event => this.onSelectChange(event, values, !values.isSelected)}>{holidayTypes[values.type]}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Editace">
                                                <IconButton aria-label="Editace" onClick={this.handleOpenEdit(values)}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Odstranění">
                                                <IconButton aria-label="Odstranění"
                                                            onClick={() => {
                                                                this.setState({
                                                                    openConfirm: true,
                                                                    openConfirmValue: values
                                                                });
                                                            }}>
                                                    <DeleteIcon/>
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
                <ConfirmationDialog
                    classes={{}}
                    title={"Smazání dovolené"}
                    text={"Přejete si smazat dovolenou?"}
                    open={this.state.openConfirm}
                    onCancel={() => {
                        this.setState({openConfirm: false, openConfirmValue: null});
                    }}
                    onConfirm={this.onDeleteSelected}
                    value={this.state.openConfirmValue}
                />
                <HolidayCreateModal open={this.state.modalOpen}
                                    user={this.props.user}
                                    edit={this.state.modalData}
                                    onClose={this.handleCloseHolidayCreateModal}
                                    onSave={(userHoliday, edit) => {
                                        this._handleSaveHolidayCreateModal(userHoliday, edit);
                                        this.handleCloseHolidayCreateModal();
                                    }}/>
            </Paper>
        );
    }
}

HolidayTable.propTypes = {
    classes: PropTypes.object,
    fullHeight: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    onSaveDone: PropTypes.func.isRequired,
    onSelectChange: PropTypes.func.isRequired,
    onSelectAllChange: PropTypes.func.isRequired,
    onDeleteSelected: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(HolidayRowRecord).isRequired,
    rowsPerPageOptions: PropTypes.array,
    user: PropTypes.instanceOf(User),
    year: PropTypes.number,
    mode: PropTypes.string,
    users: PropTypes.arrayOf(User),
};
HolidayTable.defaultProps = {
    rowsPerPageOptions: [5, 10, 25],
    user: null,
    users: [],
    mode: "USER",
};
export default withStyles(Styles, {withTheme: true})(HolidayTable);