import React from "react";
import PropTypes from "prop-types";
import UserList from "../../components/user_list/UserList";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/es/Grid/Grid";
import Styles from "../uc_home/style/HomeStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import User from "../../entity/User";

class AgendaOverview extends React.Component {

    constructor(props) {
        super(props);

        this.state = AgendaOverview.getDerivedStateFromProps(props, {});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            users: prevState.users || [],
            user: nextProps.match.params.userId && prevState.users ? prevState.users.find(x => x.id === nextProps.match.params.userId) : null,
            loadFeedback: "ready"
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

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid} container={true} spacing={16}>
                    <Grid item={true} xs={12} sm={3}>
                        <UserList match={this.props.match} history={this.props.history} user={this.state.user} users={this.state.users}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <AgendaTabs match={this.props.match} history={this.props.history} user={this.state.user}/>
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