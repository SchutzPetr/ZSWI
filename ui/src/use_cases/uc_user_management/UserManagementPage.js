import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";
import Styles from "./style/UserManagementPageStyle";
import withStyles from "material-ui/es/styles/withStyles";
import UserCreateModal from "../../components/user_create_modal/UserCreateModal";
import {Button} from "material-ui";
import UserTable from "../../components/user_table/UserTable";
import User from "../../entity/User";

class UserManagementPage extends React.Component {

    state = {
        users: [],
        loadFeedback: "loading",
        modalOpen: false,
        modalData: null
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

        Calls.getUser({data: {id: 1}, done: ()=>{}, fail: ()=>{}})
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
                    <Grid className={this.props.classes.secondGrid} item={true} xs={12} sm={8}>
                        <UserTable users={this.state.users} onEditClick={this.handleOpenEdit}/>
                        <UserCreateModal open={this.state.modalOpen} onSaveDone={this.handleOnSaveEditDone}
                                         onClose={this.handleCloseEdit} userToEdit={this.state.modalData}/>
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
