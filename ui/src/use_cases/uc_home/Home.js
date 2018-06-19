import React from "react";
import PropTypes from "prop-types";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import UserDetail from "../../components/user_detail/UserDetail";
import Styles from "./style/HomeStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import UserProject from "../../components/user_projects/UserProject";
import {Grid} from "@material-ui/core/index";
import User from "../../entity/User";


class Home extends React.Component {

    state = {
        loadFeedback: "ready",
        timeSheets: null,
        month: null,
        year: null
    };

    onTimeSheetChange = (timeSheets, month, year) => {
        this.setState({timeSheets: timeSheets, month: month, year: year});
    };

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid} container={true} spacing={16}>
                    <Grid item={true} xs={12} sm={5}>
                        <UserDetail user={this.props.authenticatedUser} mode={"USER"}/>
                        <div className={this.props.classes.divider}/>
                        <UserProject timeSheet={this.state.timeSheets} user={this.props.authenticatedUser}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={7}>
                        <AgendaTabs match={this.props.match} history={this.props.history}
                                    user={this.props.authenticatedUser} mode={"USER"} onTimeSheetChange={this.onTimeSheetChange}/>
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

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    authenticatedUser: PropTypes.instanceOf(User)

};

export default withStyles(Styles, {withTheme: true})(Home);
