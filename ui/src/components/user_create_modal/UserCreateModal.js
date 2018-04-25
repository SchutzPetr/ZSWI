import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import {withStyles} from 'material-ui/styles';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "material-ui";
import User from "./../../entity/User";

const styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //flexWrap: 'wrap',
    },
    formRow: {
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing.unit,
    },
    textField: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    select: {
        minWidth: 182
    }
});

class UserCreateModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = UserCreateModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            user: nextProps.userToEdit || new User()
        };
    }

    handleSave = () => {
        this.props.onSave(this.state.user);
    };

    handleChangeUser = name => event => {
        const value = event.target.value;
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
                <DialogTitle>Fill the form</DialogTitle>
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
                        </div>
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
    onClose: PropTypes.bool.isRequired,
    onSave: PropTypes.bool.isRequired,
    userToEdit: PropTypes.instanceOf(User)
};

export default withStyles(styles)(UserCreateModal);