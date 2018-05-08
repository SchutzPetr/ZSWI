import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TablePagination, TableRow,} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Styles from "./style/UserTableProjectAssignmentStyle";
import EnhancedTableToolbar from "./components/EnhancedUserTableProjectAssignmentToolbar";
import EnhancedTableHead from "./components/EnhancedUserTableProjectAssignmentHead";
import {IconButton, Tooltip} from "material-ui";
import EditIcon from "material-ui-icons/es/Edit";
import User from "../../entity/User";
import Project from "../../entity/Project";

class UserTableProjectAssignment extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            rowsPerPage: props.rowsPerPage || 5,
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

        if(!this.props.project){
            return(
                <Paper className={classes.empty}>

                </Paper>
            );
        }

        return (
            <Paper className={this.props.fullHeight ? classes.fullHeightRoot : classes.root}>
                <EnhancedTableToolbar project={this.props.project} onAddClick={this.props.onEditClick}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <EnhancedTableHead rowCount={this.props.users.length}/>
                        <TableBody>
                            {this.props.users.map((user, index) => {
                                user = new User();
                                return <TableRow key={`${index}-${user.orion}`}>
                                    <TableCell>{user.displayFullName}</TableCell>
                                    <TableCell>{user.mainWorkStation}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>{user.active}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Editace">
                                            <IconButton aria-label="Editace" onClick={this.props.onEditClick(user)}>
                                                <EditIcon/>
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

UserTableProjectAssignment.propTypes = {
    classes: PropTypes.object,
    onEditClick: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(User).isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
    fullHeight: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
};
UserTableProjectAssignment.defaultProps = {
    rowsPerPageOptions: [5, 10, 25]
};
export default withStyles(Styles, {withTheme: true})(UserTableProjectAssignment);