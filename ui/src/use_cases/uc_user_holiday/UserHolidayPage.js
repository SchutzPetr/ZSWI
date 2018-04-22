import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";
import Styles from "./style/UserHolidayPageStyle";
import withStyles from "material-ui/es/styles/withStyles";
import HolidayTable from "../../components/holiday_table/HolidayTable";

class UserHolidayPage extends React.Component {

    state = {
        users: [],
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
                    <Grid className={this.props.classes.secondGrid} item xs={12} sm={8}>
                        <HolidayTable/>
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

UserHolidayPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object

};

export default withStyles(Styles, {withTheme: true})(UserHolidayPage);
