import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";
import Styles from "./style/ManageHolidayPageStyle";
import withStyles from "material-ui/es/styles/withStyles";
import HolidayTable from "../../components/holiday_table/HolidayTable";
import UserList from "../../components/user_list/UserList";

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

class ManageHolidayPage extends React.Component {

    state = {
        users: userData,
        loadFeedback: "ready"
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

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid}
                      container spacing={16}
                      alignItems={"center"}
                      direction={"row"}
                      justify={"center"}>
                    <Grid item={true} xs={12} sm={3}>
                        <UserList match={this.props.match} users={this.state.users}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <HolidayTable fullHeight={true}/>
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

ManageHolidayPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object

};

export default withStyles(Styles, {withTheme: true})(ManageHolidayPage);
