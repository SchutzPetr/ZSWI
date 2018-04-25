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
        loadFeedback: "ready",
        modalOpen: false,
    };

    componentDidMount() {
        //this._fetchData();
    }

    _fetchData() {
        Calls.getUsers({
            data: {},
            done: (data) => {
                this.setState({users: data, loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        })
    }

    handleOnClose = () => {
        this.setState({modalOpen: false})
    };

    handleOnSave = () => {
        this.handleOnClose();
    };

    handleClickOpen = () => {
        this.setState({modalOpen: true})
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
                        <Button onClick={this.handleClickOpen}>Open select dialog</Button>
                        <UserTable users={[new User()]}/>
                        <UserCreateModal open={this.state.modalOpen} onSave={this.handleOnSave}
                                         onClose={this.handleOnClose} userToEdit={null}/>
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
