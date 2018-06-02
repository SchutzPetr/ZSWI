import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import {FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField} from "material-ui";
import User from "./../../entity/User";
import Calls from "../../Calls";
import Styles from "./style/ProjectCreateModalStyle";
import Project from "../../entity/Project";

class ProjectCreateModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = ProjectCreateModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            project: nextProps.projectToEdit || new Project(),
            loadFeedback: "ready",
        };
    }

    handleSave = () => {
        this.setState({loadFeedback: "loading"});
        const fail = (data) => {
            this.setState({loadFeedback: "error"});
        };
        if (this.props.projectToEdit) {
            Calls.updateProject({
                data: this.state.project,
                done: (data) => {
                    this.props.onSaveDone();
                },
                fail: fail
            });
        } else {
            Calls.createProject({
                data: this.state.project,
                done: (data) => {
                    this.props.onSaveDone();
                },
                fail: fail
            });
        }
    };

    handleChange = name => event => {
        const value = event.target.value;
        this.setState((prevState) => {
            let project = prevState.project;
            project[name] = value;

            return {
                project: project
            }
        });
    };

    render() {
        const {classes} = this.props;

        return (
            <Dialog
                maxWidth={false}
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                open={this.props.open}
                onClose={this.handleClose}
            >
                <DialogTitle>{this.props.projectToEdit ? "Editace projektu" : "Vytvoření projektu"}</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <FormGroup row={true}>
                            <TextField
                                required={true}
                                id={"name"}
                                label={"Jméno projektu"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.project.name}
                                onChange={this.handleChange("name")}
                            />
                            <TextField
                                required={true}
                                id={"shortName"}
                                label={"Zkratka"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.project.shortName}
                                onChange={this.handleChange("shortName")}
                            />
                        </FormGroup>
                        <FormGroup row={true} className={classes.fullWidth}>
                            <TextField
                                id={"description-flexible"}
                                label={"Popis projektu"}
                                margin={"normal"}
                                className={classes.textField}
                                multiline={true}
                                fullWidth={true}
                                rows={5}
                                rowsMax={5}
                                value={this.state.project.description}
                                onChange={this.handleChange('description')}
                            />
                        </FormGroup>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Zrušit
                    </Button>
                    <Button onClick={this.handleSave} color="primary">
                        Uložit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ProjectCreateModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSaveDone: PropTypes.func.isRequired,
    projectToEdit: PropTypes.instanceOf(Project)
};

export default withStyles(Styles)(ProjectCreateModal);