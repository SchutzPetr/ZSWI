import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup, TextField} from '@material-ui/core/index';
import Calls from "../../Calls";
import Styles from "./style/UserAssignProjectModalStyle";
import Project from "../../entity/Project";
import Suggestion from "../autocomplete/entity/Suggestion";
import User from "../../entity/User";
import {DatePicker} from "material-ui-pickers";
import SingleSelect from "../autocomplete/SingleSelect";
import ProjectAssign from "../../entity/ProjectAssign";

class UserAssignProjectModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = UserAssignProjectModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            projectAssign: nextProps.projectAssign || null,
            project: nextProps.projectAssign ? nextProps.projectAssign.project : nextProps.project || null,
            user: nextProps.projectAssign ? nextProps.projectAssign.user : null,
            toDate: nextProps.projectAssign ? nextProps.projectAssign.activeTo : null,
            fromDate: nextProps.projectAssign ? nextProps.projectAssign.activeFrom : new Date(),
            obligation: nextProps.projectAssign ? nextProps.projectAssign.obligation : 0.0,
            loadFeedback: "ready",
        };
    }

    static mapSimpleUserToSuggestion(user) {
        if (!user) {
            return null;
        }
        return new Suggestion(user.id, user.displayFullName, user)
    }

    static mapSimpleUsersToSuggestion(user) {
        return user.map(value => this.mapSimpleUserToSuggestion(value));
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.open !== this.props.open) {
            this._fetchData();
        }
        return true;
    }

    _fetchData() {
        Calls.getUsers({
            data: {},
            done: (data) => {
                this.setState({suggestions: User.map(data.data), loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    handleSave = () => {
        let projectAssign = new ProjectAssign();

        projectAssign.projectId = this.props.project.id;
        projectAssign.userId = this.state.user.id;
        projectAssign.activeFrom = this.state.fromDate;
        projectAssign.activeTo = this.state.toDate;
        projectAssign.obligation = this.state.obligation;

        this.props.onSave(projectAssign, !!this.props.user);
    };

    handleObligationChange = (event) => {
        let value = event.target.value;
        if (value < 0 || value > 1) {
            return;
        }
        this.setState({obligation: value});
    };


    handleOnSelect = (value = []) => {
        this.setState({user: value ? value.data : null});
    };

    handleDateChange = (type) => (date) => {
        if (type === "FROM") {
            this.setState({fromDate: date ? date.toDate() : date});
        } else {
            this.setState({toDate: date ? date.toDate() : date});
        }
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
                <DialogTitle>{this.props.projectToEdit ? "Editace úvazku" : "Vytvoření úvazku k projektu: " + this.props.project.projectName}</DialogTitle>
                <DialogContent>
                    <form className={classes.form}>
                        <FormGroup className={classes.row} row={true}>
                            <SingleSelect value={UserAssignProjectModal.mapSimpleUserToSuggestion(this.state.user)}
                                          suggestions={UserAssignProjectModal.mapSimpleUsersToSuggestion(this.props.users)}
                                          onSelect={this.handleOnSelect}
                                          disabled={this.props.user}

                            />
                        </FormGroup>
                        <FormGroup row={true} className={classes.fullWidth}>
                            <DatePicker
                                className={classes.datePicker}
                                keyboard={true}
                                label={"Datum"}
                                format={"DD/MM/YYYY"}
                                placeholder={"10/10/2018"}
                                // handle clearing outside => pass plain array if you are not controlling value outside
                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                value={this.state.fromDate}
                                maxDate={this.state.toDate}
                                onChange={this.handleDateChange("FROM")}
                                animateYearScrolling={false}
                            />
                            <DatePicker
                                className={classes.datePicker}
                                keyboard={true}
                                label={"Datum"}
                                format={"DD/MM/YYYY"}
                                placeholder={"10/10/2018"}
                                // handle clearing outside => pass plain array if you are not controlling value outside
                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                value={this.state.toDate}
                                clearable={true}
                                minDate={this.state.fromDate}
                                onChange={this.handleDateChange("TO")}
                                animateYearScrolling={false}
                            />
                            <TextField
                                className={classes.textField}
                                required={true}
                                id={"obligationNTIS"}
                                label={"Velikost úvazku na projektu"}
                                margin={"normal"}
                                type={"number"}
                                value={this.state.obligation}
                                onChange={this.handleObligationChange}
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


UserAssignProjectModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSaveDone: PropTypes.func.isRequired,
    project: PropTypes.instanceOf(Project).isRequired,
    user: PropTypes.instanceOf(User),
    users: PropTypes.arrayOf(User),
    toDate: PropTypes.instanceOf(Date),
    fromDate: PropTypes.instanceOf(Date),
    projectAssign: PropTypes.instanceOf(ProjectAssign)

};

export default withStyles(Styles)(UserAssignProjectModal);