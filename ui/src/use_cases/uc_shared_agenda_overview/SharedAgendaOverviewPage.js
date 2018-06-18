import React from "react";
import PropTypes from "prop-types";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import UserDetail from "../../components/user_detail/UserDetail";
import Styles from "./style/SharedAgendaOverviewPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {Grid} from "@material-ui/core/index";
import User from "../../entity/User";
import Calls from "../../Calls";


class SharedAgendaOverviewPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = SharedAgendaOverviewPage.getDerivedStateFromProps(props, {});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            user: null,
            userId: nextProps.match.params.userId,
            loadFeedback: "loading"
        };
    }


    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        if(!this.props.match || !this.props.match.params || !this.props.match.params.userId){
            this.setState({loadFeedback: "error"});
            return;
        }
        Calls.getUser({
            data: {id: this.props.match.params.userId},
            done: (data) => {
                this.setState({loadFeedback: "ready", user: User.map(data.data)});
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
                        <UserDetail user={this.state.user} mode={"USER"}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <AgendaTabs match={this.props.match} history={this.props.history} user={this.state.user} mode={"USER"}/>
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

SharedAgendaOverviewPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    authenticatedUser: PropTypes.instanceOf(User)

};

export default withStyles(Styles, {withTheme: true})(SharedAgendaOverviewPage);
