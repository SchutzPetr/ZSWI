import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./../style/AttendanceDayContentStyle";
import {Switch, Typography} from "@material-ui/core/index";
import Attendance from "../../../entity/Attendance";
import {DatePicker, TimePicker} from "material-ui-pickers";
import moment from "moment/moment";

class AttendanceDayContent extends React.PureComponent {

    /*shouldComponentUpdate(nextProps, nextState) {
        return update = !(nextProps.attendance.firstPartFrom === this.props.attendance.firstPartFrom &&
            nextProps.attendance.firstPartTo === this.props.attendance.firstPartTo &&
            nextProps.attendance.secondPartFrom === this.props.attendance.secondPartFrom &&
            nextProps.attendance.secondPartTo === this.props.attendance.secondPartTo &&
            nextProps.attendance.activeFrom === this.props.attendance.activeFrom &&
            nextProps.attendance.enable === this.props.attendance.enable);
    }*/

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <div className={classes.firstRow}>
                    <Typography className={classes.title} variant={"title"}>{this.props.title}</Typography>
                    <Switch
                        className={classes.switch}
                        checked={this.props.attendance.enabled}
                        onChange={this.props.handleChange("enabled", this.props.dayInWeek)}
                        value={"active"}
                    />
                    <div className={classes.datePicker}>
                        <DatePicker
                            className={classes.datePicker}
                            disabled={!this.props.attendance.enabled}
                            keyboard={true}
                            label={"Platnost Od"}
                            format={"DD/MM/YYYY"}
                            placeholder={"10/10/2018"}
                            // handle clearing outside => pass plain array if you are not controlling value outside
                            mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                            onChange={this.props.handleChange("activeFrom", this.props.dayInWeek)}
                            animateYearScrolling={false}
                            minDate={moment().subtract(1, "day")}
                            value={this.props.attendance.activeFrom}
                        />
                    </div>
                </div>
                <div className={classes.secondRow}>
                    <TimePicker
                        className={classes.timePicker}
                        disabled={!this.props.attendance.enabled}
                        clearable={true}
                        ampm={false}
                        keyboard={true}
                        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                        label="OD"
                        value={this.props.attendance.firstPartFrom}
                        minDate={new Date(new Date().setHours(0, 0, 0, 0))}
                        maxDate={new Date(this.props.attendance.firstPartTo.getTime())}
                        onChange={this.props.handleChange("firstPartFrom", this.props.dayInWeek)}
                    />
                    <TimePicker
                        className={classes.timePicker}
                        disabled={!this.props.attendance.enabled}
                        clearable={true}
                        ampm={false}
                        keyboard={true}
                        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                        label="DO"
                        value={this.props.attendance.firstPartTo}
                        minDate={new Date(this.props.attendance.firstPartFrom.getTime())}
                        maxDate={new Date(this.props.attendance.secondPartFrom.getTime())}
                        onChange={this.props.handleChange("firstPartTo", this.props.dayInWeek)}
                    />
                    <TimePicker
                        className={classes.timePicker}
                        disabled={!this.props.attendance.enabled}
                        clearable={true}
                        ampm={false}
                        keyboard={true}
                        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                        label="OD"
                        value={this.props.attendance.secondPartFrom}
                        minDate={new Date(this.props.attendance.firstPartTo.getTime())}
                        maxDate={new Date(this.props.attendance.secondPartTo.getTime())}
                        onChange={this.props.handleChange("secondPartFrom", this.props.dayInWeek)}
                    />
                    <TimePicker
                        className={classes.timePicker}
                        disabled={!this.props.attendance.enabled}
                        clearable={true}
                        ampm={false}
                        keyboard={true}
                        mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                        label="DO"
                        value={this.props.attendance.secondPartTo}
                        minDate={new Date(this.props.attendance.secondPartFrom.getTime())}
                        maxDate={new Date().setHours(23, 59, 0, 0)}
                        onChange={this.props.handleChange("secondPartTo", this.props.dayInWeek)}
                    />
                </div>
            </div>
        )
    }
}

AttendanceDayContent.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    attendance: PropTypes.instanceOf(Attendance).isRequired,
    dayInWeek: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
};

AttendanceDayContent.defaultProps = {
    attendance: new Attendance(),
};

export default withStyles(Styles, {withTheme: true})(AttendanceDayContent);