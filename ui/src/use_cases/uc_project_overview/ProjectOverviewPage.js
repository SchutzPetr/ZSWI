import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";
import Styles from "./style/ProjectOverviewPageStyle";
import withStyles from "material-ui/es/styles/withStyles";
import UserTableProjectAssignment from "../../components/user_table_project_assignment/UserTableProjectAssignment";
import ProjectOverview from "../../components/project_overview/ProjectOverview";

class ProjectOverviewPage extends React.Component {

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
                <Grid className={this.props.classes.mainGrid} container={true} spacing={16}>
                    <Grid item={true} xs={12} sm={3}>
                        <ProjectOverview/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <UserTableProjectAssignment/>
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

ProjectOverviewPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object

};

export default withStyles(Styles, {withTheme: true})(ProjectOverviewPage);
