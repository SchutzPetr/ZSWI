import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Styles from "./style/HolidayCreateModalStyle";
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogContentText, DialogTitle,} from 'material-ui/Dialog';
import {DatePicker} from "material-ui-pickers";
import {FormControl, InputLabel, MenuItem, Select} from "material-ui";

class HolidayCreateModal extends React.Component {
    state = {
        holidayDate: new Date(),
        openSelect: false,
        holidayType: "ALL_DAY"
    };

    handleChange = event => {
        this.setState({holidayType: event.target.value});
    };


    handleSelectOpen = () => {
        this.setState({openSelect: true});
    };

    handleSelectClose = () => {
        this.setState({openSelect: false});
    };

    handleDateChange = (date) => {
        this.setState({holidayDate: date});
    };

    handleSave = () => {
        this.props.onSave({holidayDate: this.state.holidayDate, holidayType: this.state.holidayType})
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
                                value={this.state.holidayDate}
                                onChange={this.handleDateChange}
                                animateYearScrolling={false}
                                minDate={minDate}
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
    edit: PropTypes.bool,
    minDate: PropTypes.bool,
};

export default withStyles(Styles, {withTheme: true})(HolidayCreateModal);