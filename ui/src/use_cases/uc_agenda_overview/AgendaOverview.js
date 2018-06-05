import React from "react";
import PropTypes from "prop-types";
import UserList from "../../components/user_list/UserList";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/es/Grid/Grid";
import Styles from "../uc_home/style/HomeStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";

export const userData = [
    {
        "givenName": "Petr",
        "familyName": "Schutz",
        "email": "schutzp@students.zcu.cz"
    },
    {
        "givenName": "Tyler",
        "familyName": "Chapman",
        "email": "chapman@students.zcu.cz"
    },
    {
        "givenName": "Petr",
        "familyName": "Schutz",
        "email": "schutzp@students.zcu.cz"
    },
    {
        "givenName": "Petr",
        "familyName": "Schutz",
        "email": "schutzp@students.zcu.cz"
    },
    {
        "givenName": "Petr",
        "familyName": "Schutz",
        "email": "schutzp@students.zcu.cz"
    },
    {
        "givenName": "Petr",
        "familyName": "Schutz",
        "email": "schutzp@students.zcu.cz"
    },
    {
        "givenName": "Petr",
        "familyName": "Schutz",
        "email": "schutzp@students.zcu.cz"
    },

];

class AgendaOverview extends React.Component {

    state = {
        users: userData,
        loadFeedback: "ready"
    };

    componentDidMount() {
        //todo: this._fetchData();
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

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid} container={true} spacing={16}>
                    <Grid item={true} xs={12} sm={3}>
                        <UserList match={this.props.match} users={this.state.users}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <AgendaTabs/>
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
    match: PropTypes.object.isRequired
};

export default withStyles(Styles, {withTheme: true})(AgendaOverview);