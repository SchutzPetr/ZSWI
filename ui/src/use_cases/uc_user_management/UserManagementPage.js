import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/Grid/Grid";
import Styles from "./style/UserManagementPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import UserCreateModal from "../../components/user_create_modal/UserCreateModal";
import UserTable from "../../components/user_table/UserTable";
import User from "../../entity/User";
import ConfirmationDialog from "../../components/confirm/ConfirmationDialog";

class UserManagementPage extends React.Component {

    state = {
        users: [],
        loadFeedback: "loading",
        modalOpen: false,
        modalData: null,
        openConfirmValue: null,
        openConfirm: false
    };

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        Calls.getUsers({
            data: {},
            done: (data) => {
                this.setState({users: User.map(data.data), loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    handleOpenEdit = modalData => event => {
        this.setState({
            modalOpen: true,
            modalData: modalData
        });
    };

    onDeleteUserClick = user => event => {
        this.setState({openConfirm: true, openConfirmValue: user});
    };

    onDeleteUser = user => {
        Calls.deleteUser({
            data: user,
            done: (data) => {
                this._fetchData();
                this.setState({openConfirm: false, openConfirmValue: null});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    };

    handleCloseEdit = () => {
        this.setState({modalOpen: false, modalData: null});
    };

    handleOnSaveEditDone = (modalData) => {
        this.setState({loadFeedback: "loading", modalOpen: false, modalData: null});
        this._fetchData();
    };

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid}
                      container={true} spacing={16}
                      alignItems={"center"}
                      direction={"row"}
                      justify={"center"}>
                    <Grid className={this.props.classes.secondGrid} item={true} xs={12} sm={11}>
                        <UserTable users={this.state.users} onEditClick={this.handleOpenEdit}
                                   onDeleteClick={this.onDeleteUserClick}/>
                        <UserCreateModal open={this.state.modalOpen} onSaveDone={this.handleOnSaveEditDone}
                                         onClose={this.handleCloseEdit} userToEdit={this.state.modalData}/>
                        <ConfirmationDialog
                            title={"Smazání uživatele"}
                            text={"Přejete si smazat uživatele?"}
                            open={this.state.openConfirm}
                            onCancel={() => {
                                this.setState({openConfirm: false, openConfirmValue: null});
                            }}
                            onConfirm={this.onDeleteUser}
                            value={this.state.openConfirmValue}
                        />
                    </Grid>
                </Grid>
            );
        } else {
            return <LinearProgressCentered paper={false}/>
        }
    }

    render() {
        return (
            <main className={this.props.classes.mainContainer}>
                {this._getContend()}
            </main>
        );
    }
}

UserManagementPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object

};

export default withStyles(Styles, {withTheme: true})(UserManagementPage);
