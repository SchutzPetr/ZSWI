import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/Grid/Grid";
import Styles from "./style/SharePageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import SharedWithMe from "../../components/share/SharedWithMe";
import SharedWithOthers from "../../components/share/SharedWithOthers";
import Share from "../../components/share/Share";
import User from "../../entity/User";
import SimpleUser from "../../entity/SimpleUser";

class SharePage extends React.Component {

    state = {
        availableUsers: [],
        sharedWithUserId: [],
        sharedWithOthers: [],
        loadFeedback: "ready",
        loadFeedback_1: "loading",
        loadFeedback_2: "loading",
        loadFeedback_3: "loading",
    };

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        Calls.getAvailableUsers({
            data: {id: this.props.authenticatedUser.id},
            done: (data) => {
                this.setState({
                    availableUsers: SimpleUser.map(data.data),
                    loadFeedback_1: "ready"
                });
            },
            fail: (data) => {
                this.setState({loadFeedback_1: "error"});
                //todo: error throw
            }
        });
        Calls.getSharedWithOthers({
            data: {id: this.props.authenticatedUser.id},
            done: (data) => {
                this.setState({
                    sharedWithUserId: SimpleUser.map(data.data),
                    loadFeedback_2: "ready"
                });
            },
            fail: (data) => {
                this.setState({loadFeedback_2: "error"});
                //todo: error throw
            }
        });
        Calls.getSharedWithUserId({
            data: {id: this.props.authenticatedUser.id},
            done: (data) => {
                this.setState({
                    sharedWithOthers: SimpleUser.map(data.data),
                    loadFeedback_3: "ready"
                });
            },
            fail: (data) => {
                this.setState({loadFeedback_3: "error"});
                //todo: error throw
            }
        });
    }

    handleShare = valueTo => {
        if (!valueTo) {
            return;
        }
        Calls.createShare({
            data: {from: this.props.authenticatedUser.id, to: valueTo.id},
            done: () => {
                this._fetchData()
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    };

    _getContend() {
        if (this.state.loadFeedback === "loading" || this.state.loadFeedback_1 === "loading" || this.state.loadFeedback_2 === "loading" || this.state.loadFeedback_3 === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready" && this.state.loadFeedback_1 === "ready" && this.state.loadFeedback_2 === "ready" && this.state.loadFeedback_3 === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid} container={true} spacing={16}>
                    <Grid item={true} xs={12} sm={4}>
                        <SharedWithMe authenticatedUser={this.props.authenticatedUser}
                                      sharedWithUserId={this.state.sharedWithUserId}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={4}>
                        <SharedWithOthers authenticatedUser={this.props.authenticatedUser}
                                          sharedWithOthers={this.state.sharedWithOthers}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={4}>
                        <Share authenticatedUser={this.props.authenticatedUser}
                               availableUsers={this.state.availableUsers} onShareClick={this.handleShare}/>
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

SharePage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    authenticatedUser: PropTypes.instanceOf(User)

};

export default withStyles(Styles, {withTheme: true})(SharePage);
