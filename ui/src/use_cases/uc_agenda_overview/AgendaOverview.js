import React from "react";
import PropTypes from "prop-types";
import UserList from "../../components/user_list/UserList";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/Grid/Grid";
import Styles from "./style/AgendaOverviewStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import User from "../../entity/User";
import UserDetail from "../../components/user_detail/UserDetail";
import UserProject from "../../components/user_projects/UserProject";

class AgendaOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = AgendaOverview.getDerivedStateFromProps(props, {});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            users: prevState.users || [],
            user: nextProps.match.params.userId && prevState.users ? prevState.users.find(x => x.id === nextProps.match.params.userId) : null,
            loadFeedback: "ready",
            timeSheets: null,
            month: null,
            year: null
        };
    }


    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        Calls.getUsers({
            data: {},
            done: (data) => {
                this.setState(prevState => {
                    const users = User.map(data.data);
                    return {
                        users: users,
                        loadFeedback: "ready",
                        user: this.props.match.params.userId ? users.find(x => x.id === this.props.match.params.userId) : null
                    }
                });
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    onTimeSheetChange = (timeSheets, month, year) => {
        this.setState({timeSheets: timeSheets, month: month, year: year});
    };

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid} container={true} spacing={16}>
                    <Grid item={true} xs={12} sm={3}>
                        <UserList match={this.props.match} history={this.props.history} user={this.state.user}
                                  users={this.state.users}/>
                        <div className={this.props.classes.divider}/>
                        <UserDetail user={this.state.user} mode={"SECRETARY"} timeSheet={this.state.timeSheets}/>
                        <div className={this.props.classes.divider}/>
                        <UserProject timeSheet={this.state.timeSheets} user={this.state.user}
                                     rootClass={this.props.classes.projectRoot}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <AgendaTabs match={this.props.match} history={this.props.history} user={this.state.user}
                                    mode={"SECRETARY"} onTimeSheetChange={this.onTimeSheetChange}/>
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

AgendaOverview.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withStyles(Styles, {withTheme: true})(AgendaOverview);