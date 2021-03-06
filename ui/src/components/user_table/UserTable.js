import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Styles from "./style/UserTableStyle";
import EnhancedTableToolbar from "./components/EnhancedUserTableToolbar";
import EnhancedTableHead from "./components/EnhancedUserTableHead";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Tooltip
} from "@material-ui/core/index";
import EditIcon from "@material-ui/icons/Edit";
import User from "../../entity/User";
import Delete from "@material-ui/icons/Delete";

class UserTable extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            rowsPerPage: props.rowsPerPage || 5,
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

    render() {
        const {classes} = this.props;
        const {rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.users.length - page * rowsPerPage);

        return (
            <Paper className={this.props.fullHeight ? classes.fullHeightRoot : classes.root}>
                <EnhancedTableToolbar onEditClick={this.props.onEditClick}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead rowCount={this.props.users.length}/>
                        <TableBody>
                            {this.props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                                return <TableRow key={`${index}-${user.orionLogin}`}>
                                    <TableCell>{user.displayFullName}</TableCell>
                                    <TableCell>{user.mainWorkStation}</TableCell>
                                    <TableCell>{user.authority}</TableCell>
                                    <TableCell>{user.active.toString()}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Editace">
                                            <IconButton aria-label="Editace" onClick={this.props.onEditClick(user)}>
                                                <EditIcon/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={"Odebrání uživatele"}>
                                            <IconButton aria-label={"Odebrání uživatele"}
                                                        onClick={this.props.onDeleteClick(user)}>
                                                <Delete/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
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
                    count={this.props.users.length}
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

UserTable.propTypes = {
    classes: PropTypes.object,
    onEditClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(User).isRequired,
    fullHeight: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
};
UserTable.defaultProps = {
    rowsPerPageOptions: [5, 10, 25]
};
export default withStyles(Styles, {withTheme: true})(UserTable);