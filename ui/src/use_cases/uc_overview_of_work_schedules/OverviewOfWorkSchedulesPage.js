import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Styles from "./style/OverviewOfWorkSchedulesPageStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import OverviewOfWorkSchedules from "../../components/overview_of_work_schedules/OverviewOfWorkSchedules";

class OverviewOfWorkSchedulesPage extends React.Component {

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
                <OverviewOfWorkSchedules/>
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

OverviewOfWorkSchedulesPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object

};

export default withStyles(Styles, {withTheme: true})(OverviewOfWorkSchedulesPage);
