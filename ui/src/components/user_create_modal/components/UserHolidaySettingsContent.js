import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./../style/UserHolidaySettingsContentStyle";
import {FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@material-ui/core/index";

class UserHolidaySettingsContent extends React.PureComponent {

    static generateYears() {
        let x = [];

        for (let i = 2018; i < 2050; i++) {
            x.push(<MenuItem value={i}>{i}</MenuItem>)
        }

        return x;
    }

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.container}>
                <Typography className={classes.title} variant={"headline"}>{"Nastavení dnů dovolené"}</Typography>
                <div className={classes.row}>
                    <FormControl className={classes.textField}>
                        <InputLabel htmlFor="holiday">ROK</InputLabel>
                        <Select
                            value={this.props.userHolidaySetting.year}
                            onChange={this.props.onYearChange}
                            required={true}
                            inputProps={{
                                name: 'year',
                                id: 'year',
                            }}
                        >
                            {UserHolidaySettingsContent.generateYears()}
                        </Select>
                    </FormControl>
                    <TextField
                        className={classes.textField}
                        required={true}
                        id={"holiday-settings"}
                        label={"Počet dní dovolené"}
                        margin={"normal"}
                        type="number"
                        value={this.props.userHolidaySetting.days}
                        onChange={this.props.onHolidayDaysChange(this.props.userHolidaySetting.year)}
                    />
                </div>
            </div>
        )
    }
}

UserHolidaySettingsContent.propTypes = {
    classes: PropTypes.object.isRequired,
    onHolidayDaysChange: PropTypes.func.isRequired,
    onYearChange: PropTypes.func.isRequired,
    userHolidaySetting: PropTypes.instanceOf(UserHolidaySettingsContent).isRequired,

};

export default withStyles(Styles, {withTheme: true})(UserHolidaySettingsContent);