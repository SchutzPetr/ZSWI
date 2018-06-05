import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/es/Grid/Grid";
import Styles from "./style/ProjectOverviewPageStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import UserTableProjectAssignment from "../../components/user_table_project_assignment/UserTableProjectAssignment";
import ProjectOverview from "../../components/project_overview/ProjectOverview";
import Project from "../../entity/Project";

class ProjectOverviewPage extends React.Component {

    state = {
        selectedProject: null,
        projects: [],
        loadFeedback: "loading",
    };

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        Calls.getProjects({
            data: {},
            done: (data) => {
                this.setState({projects: Project.map(data.data), loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    handleChangeProject = (value) => {
        this.setState({selectedProject: value ? value.data : null});
    };

    handleSaveOrEditProjectDone = () => {
        this._fetchData();
    };

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid}
                      xs={12}
                      container={true} spacing={16}
                      alignItems={"center"}
                      direction={"row"}
                      justify={"center"}>
                    <Grid item={true} xs={12} sm={3}>
                        <ProjectOverview projects={this.state.projects}
                                         project={this.state.selectedProject}
                                         onChangeProject={this.handleChangeProject}
                                         onSaveOrEditProjectDone={this.handleSaveOrEditProjectDone}/>
                    </Grid>
                    <Grid item={true} xs={12} sm={8}>
                        <UserTableProjectAssignment project={this.state.selectedProject} users={[]} onEditClick={() => {
                        }}/>
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
