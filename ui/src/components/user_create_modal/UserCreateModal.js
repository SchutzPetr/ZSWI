import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography
} from "@material-ui/core/index";
import User from "./../../entity/User";
import Attendance from "./../../entity/Attendance";
import Calls from "../../Calls";
import AttendanceDayContent from "./components/AttendanceDayContent";
import Styles from "./style/UserCreateModalStyle";
import {DatePicker, TimePicker} from "material-ui-pickers";
import moment from "moment";

class UserCreateModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = UserCreateModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const user = nextProps.userToEdit || new User();
        return {
            user: user,
            attendanceSchedules: user.attendanceSchedules,
            loadFeedback: "ready",
        };
    }


    /**
     * @returns {boolean}
     */
    validate() {
        let result = false;

        for (let i = 1; i < 6; i++) {
            result = this.state.attendanceSchedules[`${i}`].firstPartFrom < this.state.attendanceSchedules[`${i}`].firstPartTo &&
                this.state.attendanceSchedules[`${i}`].firstPartTo < this.state.attendanceSchedules[`${i}`].secondPartFrom &&
                this.state.attendanceSchedules[`${i}`].secondPartFrom < this.state.attendanceSchedules[`${i}`].secondPartTo;

            if(!result){
                return false;
            }
        }
        if (this.state.user.timeJob < 0 || this.state.user.timeJob > 1) {
            result = false;
        }

        return result;
    }

    handleSave = () => {
        if (!this.validate()) {
            return;
        }

        this.setState({loadFeedback: "loading"});
        const fail = (data) => {
            this.setState({loadFeedback: "error"});
        };

        let user = this.state.user;
        user.attendanceSchedules =  this.state.attendanceSchedules;
        if (this.props.userToEdit) {
            Calls.updateUser({
                data: user,
                done: (data) => {
                    this.props.onSaveDone();
                },
                fail: fail
            });
        } else {
            Calls.createUser({
                data: user,
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
            let user = Object.assign(new User(), prevState.user);
            user[name] = value;

            return {
                user: user
            }
        });
    };

    handleChangeAttendance = (name, dayInWeek) => value => {

        if (name === "firstPartTo" || name === "firstPartFrom" || name === "secondPartTo" || name === "secondPartFrom" || name === "activeFrom") {
            this.setState((prevState) => {
                let attendanceSchedules = Object.assign({}, prevState.attendanceSchedules);
                let attendance = Object.assign(new Attendance(), prevState.attendanceSchedules[dayInWeek]);

                if(value){
                    attendance[name] = value.toDate();
                }else{
                    attendance[name] = new Attendance()[name];
                }
                attendanceSchedules[dayInWeek] = attendance;

                debugger;


                return {
                    attendanceSchedules: attendanceSchedules
                }
            });
        } else if (name === "enabled") {
            const checked = value.target.checked;
            this.setState((prevState) => {
                let attendanceSchedules = Object.assign({}, prevState.attendanceSchedules);
                let attendance = Object.assign(new Attendance(), prevState.attendanceSchedules[dayInWeek]);

                attendance[name] = checked;
                attendanceSchedules[dayInWeek] = attendance;

                return {
                    attendanceSchedules: attendanceSchedules
                }
            });
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
                            <TextField
                                required={true}
                                id={"orionLogin"}
                                label={"Orion Login"}
                                margin={"normal"}
                                className={classes.textField}
                                value={this.state.user.orionLogin}
                                onChange={this.handleChangeUser("orionLogin")}
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
                                className={classes.textField}
                                required={true}
                                id={"orionLogin"}
                                label={"Velikost úvazku"}
                                margin={"normal"}
                                type="number"
                                value={this.state.user.timeJob}
                                onChange={this.handleChangeUser("timeJob")}
                            />
                            <FormControlLabel
                                className={classes.switch}
                                control={
                                    <Switch
                                        checked={this.state.user.active}
                                        onChange={this.handleChangeUserSwitch}
                                        value={"active"}
                                    />
                                }
                                label="Aktivní"
                            />
                        </div>
                        <Typography className={classes.timePickerTitle} variant={"headline"}>Docházka</Typography>
                        <AttendanceDayContent attendance={this.state.attendanceSchedules["1"]} title={"Pondělí"}
                                              handleChange={this.handleChangeAttendance} dayInWeek={1}/>
                        <AttendanceDayContent attendance={this.state.attendanceSchedules["2"]} title={"Úterý"}
                                              handleChange={this.handleChangeAttendance} dayInWeek={2}/>
                        <AttendanceDayContent attendance={this.state.attendanceSchedules["3"]} title={"Středa"}
                                              handleChange={this.handleChangeAttendance} dayInWeek={3}/>
                        <AttendanceDayContent attendance={this.state.attendanceSchedules["4"]} title={"Čtvrtek"}
                                              handleChange={this.handleChangeAttendance} dayInWeek={4}/>
                        <AttendanceDayContent attendance={this.state.attendanceSchedules["5"]} title={"Pátek"}
                                              handleChange={this.handleChangeAttendance} dayInWeek={5}/>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color="primary">
                        Zrušit
                    </Button>
                    <Button onClick={this.handleSave} disabled={!this.validate()} color="primary">
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
    userToEdit: PropTypes.instanceOf(User),
};

export default withStyles(Styles)(UserCreateModal);