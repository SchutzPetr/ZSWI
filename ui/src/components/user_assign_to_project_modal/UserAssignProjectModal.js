import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormGroup} from '@material-ui/core/index';
import Calls from "../../Calls";
import Styles from "./style/UserAssignProjectModalStyle";
import Project from "../../entity/Project";
import MultipleSelect from "../autocomplete/MultipleSelect";
import Suggestion from "../autocomplete/entity/Suggestion";
import User from "../../entity/User";
import {DatePicker} from "material-ui-pickers";
import SingleSelect from "../autocomplete/SingleSelect";

class UserAssignProjectModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = UserAssignProjectModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            project: nextProps.project,
            user: nextProps.user || null,
            users: [],
            loadFeedback: "ready",
            suggestions: [],
            toDate: null,
            fromDate: new Date()
        };
    }

    static mapUserToSuggestion(user) {
        if (!user) {
            return null;
        }
        return new Suggestion(user.id, user.displayFullName, user)
    }

    static mapUsersToSuggestion(user) {
        return user.map(value => this.mapUserToSuggestion(value));
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
        this.setState({loadFeedback: "loading"});
        const fail = (data) => {
            this.setState({loadFeedback: "error"});
        };
        /*if (this.props.projectToEdit) {
            Calls.editProject({
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
        }*/
    };


    handleOnSelect = (value = []) => {
        this.setState({users: value ? value.map(value1 => value1.data) : []});
    };

    handleDateChange = (type) => (date) => {
        if (type === "FROM") {
            this.setState({fromDate: date});
        } else {
            this.setState({toDate: date});
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
                    <form className={classes.container}>
                        <FormGroup className={classes.row} row={true}>
                            {this.props.user ?
                                <SingleSelect value={UserAssignProjectModal.mapUserToSuggestion(this.props.users)}
                                              suggestions={UserAssignProjectModal.mapUserToSuggestion(this.props.users)}
                                              onSelect={()=>{}}
                                              disabled={true}

                                /> : <MultipleSelect
                                    suggestions={UserAssignProjectModal.mapUsersToSuggestion(this.state.suggestions)}
                                    onSelect={this.handleOnSelect}
                                    values={UserAssignProjectModal.mapUsersToSuggestion(this.state.users)}/>
                            }
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
                                onChange={this.handleDateChange("TO")}
                                animateYearScrolling={false}
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

};

export default withStyles(Styles)(UserAssignProjectModal);