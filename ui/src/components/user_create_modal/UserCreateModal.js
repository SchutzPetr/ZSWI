import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import {FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField} from "material-ui";
import User from "./../../entity/User";
import Calls from "../../Calls";
import Styles from "./style/UserCreateModalStyle";

class UserCreateModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = UserCreateModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            user: nextProps.userToEdit || new User(),
            loadFeedback: "ready",
        };
    }

    handleSave = () => {
        this.setState({loadFeedback: "loading"});
        const fail = (data) => {
            this.setState({loadFeedback: "error"});
        };
        if (this.props.user) {
            Calls.createUser({
                data: this.state.user,
                done: (data) => {
                    this.props.onSaveDone();
                },
                fail: fail
            });
        } else {
            Calls.createUser({
                data: this.state.user,
                done: (data) => {
                    this.props.onSaveDone();
                },
                fail: fail
            });
        }
    };

    handleChangeUserSwitch = event => {
        const value = event.target.value;
        const checked = event.target.checked;
        this.setState((prevState) => {
            let user = prevState.user;
            user[value] = checked;

            return {
                user: user
            }
        });
    };

    handleChangeUser = name => event => {
        const value = event.target.value;
        if (name === "timeJob") {
            if (value < 0 || value > 1) {
                return;
            }
        }
        this.setState((prevState) => {
            let user = prevState.user;
            user[name] = value;

            return {
                user: user
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
                <DialogTitle>{this.props.userToEdit ? "Editace uživatele" : "Vytvoření uživatele"}</DialogTitle>
                <DialogContent>
                    <form className={classes.container}>
                        <div className={classes.formRow}>
                            <TextField
                                id={"title_prefix"}
                                label={"Titul před jménem"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.user.honorificPrefix}
                                onChange={this.handleChangeUser("honorificPrefix")}
                            />
                            <TextField
                                required={true}
                                id={"name"}
                                label={"Jméno"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.user.name}
                                onChange={this.handleChangeUser("name")}
                            />
                            <TextField
                                required={true}
                                id={"lastName"}
                                label={"Příjmení"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.user.lastName}
                                onChange={this.handleChangeUser("lastName")}
                            />
                            <TextField
                                id={"title_suffix"}
                                label={"Titul za jménem"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.user.honorificSuffix}
                                onChange={this.handleChangeUser("honorificSuffix")}
                            />
                        </div>
                        <div className={classes.formRow}>
                            <TextField
                                required={true}
                                id={"orion"}
                                label={"Orion"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.user.orion}
                                onChange={this.handleChangeUser("orion")}
                            />
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="authority-simple">Role</InputLabel>
                                <Select
                                    value={this.state.user.authority}
                                    className={classes.select}
                                    onChange={this.handleChangeUser("authority")}
                                    inputProps={{
                                        name: 'authority',
                                        id: 'authority-simple',
                                    }}
                                >
                                    <MenuItem value={"USER"}>Zaměstnanec</MenuItem>
                                    <MenuItem value={"SECRETARY"}>Sekretářka</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="main-workstation-simple">Pracovní zařazení</InputLabel>
                                <Select
                                    value={this.state.user.mainWorkStation}
                                    className={classes.select}
                                    onChange={this.handleChangeUser("mainWorkStation")}
                                    inputProps={{
                                        name: 'mainWorkStation',
                                        id: 'main-workstation-simple',
                                    }}
                                >
                                    <MenuItem value={"KIV"}>KIV</MenuItem>
                                    <MenuItem value={"NTIS"}>NTIS</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                required={true}
                                id={"orion"}
                                label={"Velikost úvazku"}
                                margin={"normal"}
                                type="number"
                                className={classes.textField}
                                value={this.state.user.timeJob}
                                onChange={this.handleChangeUser("timeJob")}
                            />
                        </div>
                        <FormGroup row={true}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.user.active}
                                        onChange={this.handleChangeUserSwitch}
                                        value={"active"}
                                    />
                                }
                                label="Secondary"
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

UserCreateModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSaveDone: PropTypes.func.isRequired,
    userToEdit: PropTypes.instanceOf(User)
};

export default withStyles(Styles)(UserCreateModal);