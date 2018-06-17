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
import SimpleUser from "../../entity/SimpleUser";
import ProjectAssign from "../../entity/ProjectAssign";

class UserTableProjectAssignment extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            rowsPerPage: props.rowsPerPage || 5,
            modalOpen: false,
            rowData: null,
            loadFeedback: "ready",
            loadFeedback_1: "loading",
            loadFeedback_2: "loading",
            assignUsers: []
        };
    }

    componentDidMount() {
        this._fetchData();
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

    _fetchData(project = this.props.project) {
        if (!project) {
            return;
        }
        this.setState({loadFeedback_1: "loading", loadFeedback_2: "loading"}, () => {
            Calls.getSimpleUsers({
                data: {},
                done: (data) => {
                    this.setState({users: SimpleUser.map(data.data), loadFeedback_1: "ready"});
                },
                fail: (data) => {
                    this.setState({loadFeedback_1: "error"});
                    //todo: error throw
                }
            });
            Calls.getAssignUsersToProject({
                data: {id: project.id},
                done: (data) => {
                    this.setState({assignUsers: ProjectAssign.map(data.data), loadFeedback_2: "ready"});
                },
                fail: (data) => {
                    this.setState({loadFeedback_2: "error"});
                    //todo: error throw
                }
            });
        });
    }

    handleOpenEdit = rowData => event => {
        this.setState({
            modalOpen: true,
            rowData: rowData
        });
    };

    handleCloseEdit = () => {
        this.setState({modalOpen: false, rowData: null});
    };

    onSaveAssign = (project, update) => {
        if(update){
            Calls.updateProjectAssign({
                data: project,
                done: (data) => {
                    this.setState({loadFeedback: "ready"});
                },
                fail: (data) => {
                    this.setState({loadFeedback_2: "error"});
                    //todo: error throw
                }
            });
        }else{
            Calls.createProjectAssign({
                data: project,
                done: (data) => {
                    this.setState({loadFeedback: "ready"});
                },
                fail: (data) => {
                    this.setState({loadFeedback_2: "error"});
                    //todo: error throw
                }
            });
        }
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
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.assignUsers.length - page * rowsPerPage);

        if (!this.props.project) {
            return (
                <Paper className={classes.empty}>

                </Paper>
            );
        }
        if (this.state.loadFeedback === "loading" || this.state.loadFeedback_1 === "loading" || this.state.loadFeedback_2 === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready" && this.state.loadFeedback_1 === "ready" && this.state.loadFeedback_2 === "ready") {
            return (
                <Paper className={this.props.fullHeight ? classes.fullHeightRoot : classes.root}>
                    <EnhancedTableToolbar project={this.props.project} onAddClick={this.handleOpenEdit}/>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <EnhancedTableHead rowCount={this.state.assignUsers.length}/>
                            <TableBody>
                                {this.state.assignUsers.map((user, index) => {
                                    user = new User();
                                    return <TableRow key={`${index}-${user.orionLogin}`}>
                                        <TableCell>{user.displayFullName}</TableCell>
                                        <TableCell>{user.mainWorkStation}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>{user.active}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Editace">
                                                <IconButton aria-label="Editace" onClick={this.handleOpenEdit(user)}>
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
                        count={this.state.assignUsers.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        rowsPerPageOptions={this.props.rowsPerPageOptions}
                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                    <UserAssignProjectModal user={this.state.rowData}
                                            users={this.state.users}
                                            open={this.state.modalOpen}
                                            project={this.props.project}
                                            onSave={this.onSaveAssign} onClose={this.handleCloseEdit}/>
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
    project: PropTypes.instanceOf(Project),
    fullHeight: PropTypes.bool,
    rowsPerPage: PropTypes.number,
    rowsPerPageOptions: PropTypes.array,
};
UserTableProjectAssignment.defaultProps = {
    rowsPerPageOptions: [5, 10, 25]
};
export default withStyles(Styles, {withTheme: true})(UserTableProjectAssignment);