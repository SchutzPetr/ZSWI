import React from "react";
import PropTypes from "prop-types";
import Styles from "./style/ProjectOverviewStyle"
import {withStyles} from "@material-ui/core/styles/index";
import {IconButton, Paper, Tooltip, Typography} from "@material-ui/core/index";
import ProjectSelect from "../autocomplete/SingleSelect";
import Project from "../../entity/Project";
import Suggestion from "../autocomplete/entity/Suggestion";
import AddIcon from "@material-ui/icons/es/Add";
import EditIcon from "@material-ui/icons/es/Edit";
import ProjectCreateModal from "../project_create_modal/ProjectCreateModal"

class ProjectOverview extends React.Component {

    state = {
        modalOpen: false,
        modalData: null,
    };

    static mapProjectToSuggestion(project) {
        if (!project) {
            return null;
        }
        return new Suggestion(project.id, project.name, project)
    }

    static mapProjectsToSuggestion(projects) {
        return projects.map(value => this.mapProjectToSuggestion(value));
    }

    handleOpenEdit = modalData => event => {
        this.setState({
            modalOpen: true,
            modalData: modalData
        });
    };

    handleCloseEdit = () => {
        this.setState({modalOpen: false, modalData: null});
    };

    handleSaveOrEditProjectDone = (project) => {
        this.handleCloseEdit();
        this.props.onSaveOrEditProjectDone(project);
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <div className={classes.toolbar}>
                    <div>
                        <Typography variant="title">Projekt</Typography>
                    </div>
                    <div className={classes.actions}>
                        <Tooltip title={"Přidat nový projekt"}>
                            <IconButton aria-label={"Přidat nový projekt"} onClick={this.handleOpenEdit(null)}>
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                        {this.props.project !== null ?
                            <Tooltip title={"Editovat vybraný projekt"}>
                                <IconButton aria-label={"Editovat vybraný projekt"}
                                            onClick={this.handleOpenEdit(this.props.project)}>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            : null}
                    </div>
                </div>
                <div>
                    <div className={classes.projectSelect}>
                        <ProjectSelect value={ProjectOverview.mapProjectToSuggestion(this.props.project)}
                                       suggestions={ProjectOverview.mapProjectsToSuggestion(this.props.projects)}
                                       onSelect={this.props.onChangeProject} placeholder={"Vyberte projekt:"}/>
                    </div>
                    {this.props.project ?
                        <div className={classes.projectDetail}>
                            <Typography className={classes.text}
                                        variant={"title"}>{`Název: ${this.props.project.name}`}</Typography>
                            <Typography className={classes.text}
                                        variant={"title"}>{`Zkratka: ${this.props.project.shortName}`}</Typography>
                            <Typography className={classes.text} variant={"title"}>{"Popis: "}</Typography>
                            <Typography className={classes.textScroll}>{this.props.project.description}</Typography>
                        </div>
                        : null}
                </div>
                <ProjectCreateModal open={this.state.modalOpen} projectToEdit={this.state.modalData}
                                    onSaveDone={this.handleSaveOrEditProjectDone} onClose={this.handleCloseEdit}/>
            </Paper>
        );
    }
}

ProjectOverview.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
    projects: PropTypes.arrayOf(Project).isRequired,
    onChangeProject: PropTypes.func.isRequired,
    onSaveOrEditProjectDone: PropTypes.func.isRequired,
};

export default withStyles(Styles, {withTheme: true})(ProjectOverview);