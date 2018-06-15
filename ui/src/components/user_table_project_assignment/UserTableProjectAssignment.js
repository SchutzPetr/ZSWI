import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Styles from "./style/UserTableProjectAssignmentStyle";
import EnhancedTableToolbar from "./components/EnhancedUserTableProjectAssignmentToolbar";
import EnhancedTableHead from "./components/EnhancedUserTableProjectAssignmentHead";
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
import Project from "../../entity/Project";
import UserAssignProjectModal from "../user_assign_to_project_modal/UserAssignProjectModal";
import LinearProgressCentered from "../LinearProgressCentered";
import Calls from "../../Calls";

class UserTableProjectAssignment extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            rowsPerPage: props.rowsPerPage || 5,
            modalOpen: false,
            modalData: null,
            loadFeedback: "loading"
        };
    }

    componentDidMount() {
        this._fetchData(this.props.project);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.project) {
            return true;
        }
        if ((!this.props.project && nextProps.project) || nextProps.project.id !== this.props.project.id) {
            this._fetchData(nextProps.project);
        }
        return true;
    }

    _fetchData(project) {
        if (!project) {
            return;
        }
        this.setState({users: [], loadFeedback: "ready"});
        /*Calls.getAssignUsersToProject({
            data: project,
            done: (data) => {
                this.setState({users: User.map(data.data), loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });*/
    }

    handleOpenEdit = modalData => event => {
        this.setState({
            modalOpen: true,
            modalData: modalData
        });
    };

    handleCloseEdit = () => {
        this.setState({modalOpen: false, modalData: null});
    };

    handleOnSaveDone = (project) => {
        this.handleCloseEdit();
    };

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

        if (!this.props.project) {
            return (
                <Paper className={classes.empty}>

                </Paper>
            );
        }
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Paper className={this.props.fullHeight ? classes.fullHeightRoot : classes.root}>
                    <EnhancedTableToolbar project={this.props.project} onAddClick={this.handleOpenEdit}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <EnhancedTableHead rowCount={this.props.users.length}/>
                            <TableBody>
                                {this.props.users.map((user, index) => {
                                    user = new User();
                                    return <TableRow key={`${index}-${user.orionLogin}`}>
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
                    <UserAssignProjectModal user={null} open={this.state.modalOpen} project={this.props.project}
                                            onSaveDone={this.handleOnSaveDone} onClose={this.handleCloseEdit}/>
                </Paper>
            );
        } else {
            return <LinearProgressCentered paper={false}/>
        }
    }
}

UserTableProjectAssignment.propTypes = {
    classes: PropTypes.object,
    onEditClick: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(User),
    project: PropTypes.instanceOf(Project),
    fullHeight: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
};
UserTableProjectAssignment.defaultProps = {
    rowsPerPageOptions: [5, 10, 25]
};
export default withStyles(Styles, {withTheme: true})(UserTableProjectAssignment);