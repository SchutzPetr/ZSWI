import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";
import Styles from "./style/ManageHolidayPageStyle";
import withStyles from "material-ui/es/styles/withStyles";
import HolidayTable from "../../components/holiday_table/HolidayTable";
import UserList from "../../components/user_list/UserList";
import HolidayRowRecord from "../../entity/HolidayRowRecord";

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

function createData() {
    let data = [];
    for (let i = 0; i < 25; i++) {
        data.push(new HolidayRowRecord(i, 1, new Date(), "ALL_DAY", false))
    }

    return data;
}

class ManageHolidayPage extends React.Component {

    state = {
        users: userData,
        loadFeedback: "ready",
        data: createData(),
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

    onSelectChange = (item, value) => {
        this.setState((prevState) => {
            let data = prevState.data;
            data.find(x => x.id === item.id).isSelected = value;
            return {
                data: data
            }
        });
    };

    onSelectAllChange = (value)=>{
        this.setState((prevState) => {
            let data = prevState.data;
            data.forEach(x => {x.isSelected = value});
            return {
                data: data
            }
        });
    };

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid}
                      container={true}
                      spacing={16}
                      alignItems={"center"}
                      direction={"row"}
                      justify={"center"}>
                    <Grid item={true} xs={12} sm={3}>
                        <UserList match={this.props.match} users={this.state.users}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <HolidayTable fullHeight={true}
                                      data={this.state.data}
                                      rowsPerPage={11}
                                      rowsPerPageOptions={[]}
                                      onSelectChange={this.onSelectChange}
                                      onSelectAllChange={this.onSelectAllChange}/>
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
