import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import Styles from "./style/HolidayCreateModalStyle";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select
} from '@material-ui/core/index';
import {DatePicker} from "material-ui-pickers";
import UserHoliday from "../../entity/UserHoliday";
import User from "../../entity/User";
import moment from "moment";

class HolidayCreateModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            holidayDateFrom: props.edit ? props.edit.date : new Date(),
            holidayDateTo: props.edit ? props.edit.date : new Date(),
            openSelect: false,
            holidayType: "ALL_DAY"
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            holidayDateFrom: nextProps.edit ? nextProps.edit.date : new Date(),
            holidayDateTo: nextProps.edit ? nextProps.edit.date : new Date(),
            openSelect: false,
            holidayType: nextProps.edit ? nextProps.edit.type : "ALL_DAY"
        };
    }

    handleChange = event => {
        this.setState({holidayType: event.target.value});
    };


    handleSelectOpen = () => {
        this.setState({openSelect: true});
    };

    handleSelectClose = () => {
        this.setState({openSelect: false});
    };

    handleDateChange = name => (date) => {
        if (name === "holidayDateFrom") {
            this.setState({holidayDateFrom: date ? date.toDate() : null});
        } else {
            this.setState({holidayDateTo: date ? date.toDate() : null});
        }
    };

    handleSave = () => {
        debugger;
        if (this.props.edit) {
            let userHoliday = this.props.edit;
            userHoliday.userId = this.props.user.id;
            userHoliday.date = new Date(this.state.holidayDateFrom);
            userHoliday.type = this.state.holidayType;

            this.props.onSave(userHoliday, true)
        } else {
            let holidays = [];

            for (let day = new Date(new Date(this.state.holidayDateFrom).setHours(0, 0, 0, 0)); day <=  new Date(new Date(this.state.holidayDateTo).setHours(0, 0, 0, 0)); day.setDate(day.getDate() + 1)) {
                if (day.getDay() === 6 || day.getDate() === 0) {
                    continue;
                }

                let userHoliday = new UserHoliday();
                userHoliday.userId = this.props.user.id;
                userHoliday.date = new Date(day);
                userHoliday.type = this.state.holidayType;

                holidays.push(userHoliday);
            }
            this.props.onSave(holidays, false)
        }
    };

    render() {
        let minDate = new Date();
        if (minDate != null) {
            minDate.setDate(minDate.getDate() - 1);
        }
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="form-dialog-title">{this.props.edit ? "Editace dovolené" : "Vytvoření dovolené"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occationally.
                    </DialogContentText>
                    <div className={this.props.classes.flex}>
                        <div className={"picker"}>
                            <DatePicker
                                keyboard
                                label={"Datum"}
                                format={"DD/MM/YYYY"}
                                placeholder={"10/10/2018"}
                                // handle clearing outside => pass plain array if you are not controlling value outside
                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                value={this.state.holidayDateFrom}
                                onChange={this.handleDateChange("holidayDateFrom")}
                                animateYearScrolling={false}
                                minDate={minDate}
                            />
                            <DatePicker
                                keyboard
                                label={"Datum"}
                                format={"DD/MM/YYYY"}
                                placeholder={"10/10/2018"}
                                disabled={this.props.edit}
                                clearable={true}
                                // handle clearing outside => pass plain array if you are not controlling value outside
                                mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                value={this.state.holidayDateTo}
                                onChange={this.handleDateChange("holidayDateTo")}
                                animateYearScrolling={false}
                                minDate={this.state.holidayDateFrom}
                                maxDate={moment(this.state.holidayDateFrom).add(2, "M").toDate()}
                            />
                        </div>
                        <FormControl className={this.props.classes.formControl}>
                            <InputLabel htmlFor="controlled-open-select">Typ</InputLabel>
                            <Select
                                open={this.state.openSelect}
                                onClose={this.handleSelectClose}
                                onOpen={this.handleSelectOpen}
                                value={this.state.holidayType}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'HOLIDAY_TYPE',
                                    id: 'controlled-open-select',
                                }}
                            >
                                <MenuItem value={"ALL_DAY"}>Celý den</MenuItem>
                                <MenuItem value={"FIRST_PART_OF_DAY"}>První polovina dne</MenuItem>
                                <MenuItem value={"SECOND_PART_OF_DAY"}>Druhá polovina dne</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
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

HolidayCreateModal.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    edit: PropTypes.instanceOf(UserHoliday),
    minDate: PropTypes.bool,
    user: PropTypes.instanceOf(User),
};

export default withStyles(Styles, {withTheme: true})(HolidayCreateModal);