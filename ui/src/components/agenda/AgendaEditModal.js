import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/Typography";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    IconButton,
    Snackbar
} from "@material-ui/core/index";

import {TimePicker} from 'material-ui-pickers';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from '@material-ui/icons/Close';
import DayTimeSheet from "../../entity/DayTimeSheet";
import Attendance from "../../entity/Attendance";
import {FormControlLabel, Switch} from "@material-ui/core/es/index";
import User from "../../entity/User";


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const styles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    snackbar: {
        position: 'absolute',
    },
    snackbarClose: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    expansionPanelDetails:{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        //alignItems: "center",
    },
    switchEnable:{
        width: "100%"
    }
});

class AgendaEditModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = AgendaEditModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            expanded: null,

            firstPartFrom: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.firstPartFrom,
            firstPartTo: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.firstPartTo,
            secondPartFrom: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.secondPartFrom,
            secondPartTo: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.secondPartTo,

            dayType: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.dayType,

            enabledFirstPart: nextProps.dayTimeSheet == null ? false : (nextProps.dayTimeSheet.firstPartFrom && nextProps.dayTimeSheet.firstPartTo),
            enabledSecondPart: nextProps.dayTimeSheet == null ? false : (nextProps.dayTimeSheet.secondPartFrom && nextProps.dayTimeSheet.secondPartTo),

        };
    }

    handleChangePanel = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : null
        });
    };


    _handleSave = () => {
        this.setState({
            expanded: null
        });

        let result = this.props.dayTimeSheet.clone();

        result.firstPartFrom = this.state.firstPartFrom;
        result.firstPartTo = this.state.firstPartTo;

        result.secondPartFrom = this.state.secondPartFrom;
        result.secondPartTo = this.state.secondPartTo;

        result.dayType = this.state.dayType;

        this.props.handleOnSave(result);
    };

    handleChange = name => value => {
        this.setState((prevState) => {

            if (value) {
                prevState[name] = value.toDate();
            } else {
                if (name === "firstPartFrom" || name === "firstPartTo") {
                    prevState["firstPartFrom"] = null;
                    prevState["firstPartTo"] = null;
                } else if (name === "secondPartFrom" || name === "secondPartTo") {
                    prevState["secondPartFrom"] = null;
                    prevState["secondPartTo"] = null;
                }
            }

            return {...prevState}
        });
    };

    handleChangeEnable = name => value => {
        const checked = value.target.checked;
        let attendance = this.props.user.attendanceSchedules[new Date().getDay()];

        if(name === "enabledFirstPart"){
            if(checked){
                this.setState({
                    enabledFirstPart: checked,
                    firstPartFrom: this.props.dayTimeSheet ? this.props.dayTimeSheet.firstPartFrom : attendance ? attendance.firstPartFrom ? attendance.firstPartFrom : new Date(new Date().setHours(8, 0, 0, 0)) :  new Date(new Date().setHours(8, 0, 0, 0)),
                    firstPartTo: this.props.dayTimeSheet ? this.props.dayTimeSheet.firstPartTo : attendance ? attendance.firstPartTo ? attendance.firstPartTo : new Date(new Date().setHours(12, 0, 0, 0)) :  new Date(new Date().setHours(12, 0, 0, 0)),
                });
            }else{
                this.setState({
                    enabledFirstPart: checked,
                    firstPartFrom: null,
                    firstPartTo: null
                });
            }
        }else if(name === "enabledSecondPart"){
            if(checked){
                this.setState({
                    enabledSecondPart: checked,
                    secondPartFrom: this.props.dayTimeSheet ? this.props.dayTimeSheet.secondPartFrom : attendance ? attendance.secondPartFrom ? attendance.secondPartFrom : new Date(new Date().setHours(12, 30, 0, 0)) :  new Date(new Date().setHours(12, 30, 0, 0)),
                    secondPartTo: this.props.dayTimeSheet ? this.props.dayTimeSheet.secondPartTo : attendance ? attendance.secondPartTo ? attendance.secondPartTo : new Date(new Date().setHours(16, 30, 0, 0)) :  new Date(new Date().setHours(16, 30, 0, 0)),
                });
            }else{
                this.setState({
                    enabledSecondPart: checked,
                    secondPartFrom: null,
                    secondPartTo: null
                });
            }
        }
    };

    _handleClose = () => {
        this.setState({
            expanded: null
        });
        this.props.handleClose();
    };

    _handleFromDateChange = firstPart => (date) => {
        if (firstPart) {
            this.setState(prevState => {
                date = date.year(prevState.firstPartFrom.year()).month(prevState.firstPartFrom.month()).date(prevState.firstPartFrom.date());

                if (AgendaEditModal.checkDate(date, prevState.firstPartTo)) {
                    return {
                        firstPartFrom: date
                    }
                } else {
                    return {
                        snackbar: true,
                        snackbarText: "Čas OD musí být menší, než čas DO"
                    }
                }

            });
        } else {
            this.setState(prevState => {
                date = date.year(prevState.secondPartFrom.year()).month(prevState.secondPartFrom.month()).date(prevState.secondPartFrom.date());

                if (AgendaEditModal.checkDate(date, prevState.secondPartTo)) {
                    return {
                        secondPartFrom: date
                    }
                } else {
                    return {
                        snackbar: true,
                        snackbarText: "Čas OD musí být menší, než čas DO"
                    }
                }

            });
        }
    };

    _handleToDateChange = firstPart => (date) => {
        if (firstPart) {
            this.setState(prevState => {
                date = date.year(prevState.firstPartTo.year()).month(prevState.firstPartTo.month()).date(prevState.firstPartTo.date());

                if (AgendaEditModal.checkDate(prevState.firstPartFrom, date)) {
                    return {
                        firstPartTo: date
                    }
                } else {
                    return {
                        snackbar: true,
                        snackbarText: "Čas OD musí být menší, než čas DO"
                    }
                }

            });
        } else {
            this.setState(prevState => {
                date = date.year(prevState.secondPartTo.year()).month(prevState.secondPartTo.month()).date(prevState.secondPartTo.date());

                if (AgendaEditModal.checkDate(prevState.secondPartFrom, date)) {
                    return {
                        secondPartTo: date
                    }
                } else {
                    return {
                        snackbar: true,
                        snackbarText: "Čas OD musí být menší, než čas DO"
                    }
                }

            });
        }
    };

    static checkDate(dateFrom, dateTo) {
        return dateFrom < dateTo;

    }

    _getMinDate(name) {
        if (name === "firstPartFrom") {
            return new Date(new Date().setHours(0, 0, 0, 0));
        } else if (name === "firstPartTo") {
            if(this.state.enabledFirstPart){
                return new Date(this.state.firstPartFrom.getTime());
            }
            return null;
        } else if (name === "secondPartFrom") {
            if(this.state.enabledFirstPart){
                return new Date(this.state.firstPartTo.getTime());
            }
            return null;

        } else if (name === "secondPartTo") {
            if(this.state.enabledSecondPart){
                return new Date(this.state.secondPartFrom.getTime());
            }
            return null;
        }

    };

    _getMaxDate(name) {
        if (name === "firstPartFrom") {
            if(this.state.enabledFirstPart){
                return new Date(this.state.firstPartTo.getTime());
            }
            return null;
        } else if (name === "firstPartTo") {
            if(this.state.enabledSecondPart){
                return new Date(this.state.secondPartFrom.getTime())
            }
            return null;
        } else if (name === "secondPartFrom") {
            if(this.state.enabledSecondPart){
                return new Date(this.state.secondPartTo.getTime());
            }
            return null;

        } else if (name === "secondPartTo") {
            return new Date().setHours(23, 59, 0, 0);
        }else{
            return null;
        }

    };

    /**
     * @returns {boolean}
     */
    validate() {
        let result;

        if(this.state.enabledFirstPart && this.state.enabledSecondPart){
            result = this.state.firstPartFrom < this.state.firstPartTo &&
                this.state.firstPartTo < this.state.secondPartFrom &&
                this.state.secondPartFrom < this.state.secondPartTo;
        }else if(this.state.enabledFirstPart && !this.state.enabledSecondPart){
            result = this.state.firstPartFrom < this.state.firstPartTo;
        } else if(!this.state.enabledFirstPart && this.state.enabledSecondPart){
            result =  this.state.secondPartFrom < this.state.secondPartTo;
        }else{
            result = true;
        }
        return result;
    }

    render() {
        const {classes} = this.props;

        if (!this.props.dayTimeSheet) {
            return null;
        }

        return (

            <Dialog
                open={this.props.open}
                onClose={this._handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Editace výkazů</DialogTitle>
                <DialogContent>
                    <ExpansionPanel expanded={this.state.expanded === 'panel1'}
                                    onChange={this.handleChangePanel('panel1')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>První část</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                            <div className={classes.switchEnable}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.enabledFirstPart}
                                            onChange={this.handleChangeEnable("enabledFirstPart")}
                                            value={"active"}
                                        />
                                    }
                                    label={"Povolena první část"}
                                />
                            </div>
                            <TimePicker
                                disabled={!this.state.enabledFirstPart}
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="OD"
                                value={this.state.firstPartFrom}
                                minDate={this._getMinDate("firstPartFrom")}
                                maxDate={this._getMaxDate("firstPartFrom")}
                                onChange={this.handleChange("firstPartFrom")}
                            />
                            <TimePicker
                                disabled={!this.state.enabledFirstPart}
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="DO"
                                value={this.state.firstPartTo}
                                minDate={this._getMinDate("firstPartTo")}
                                maxDate={this._getMaxDate("firstPartTo")}
                                onChange={this.handleChange("firstPartTo")}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.expanded === 'panel2'}
                                    onChange={this.handleChangePanel('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>Druhá část</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className={classes.switchEnable}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={this.state.enabledSecondPart}
                                            onChange={this.handleChangeEnable("enabledSecondPart")}
                                            value={"active"}
                                        />
                                    }
                                    label={"Povolena první část"}
                                />
                            </div>
                            <TimePicker
                                disabled={!this.state.enabledSecondPart}
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="OD"
                                value={this.state.secondPartFrom}
                                minDate={this._getMinDate("secondPartFrom")}
                                maxDate={this._getMaxDate("secondPartFrom")}
                                onChange={this.handleChange("secondPartFrom")}
                            />
                            <TimePicker
                                disabled={!this.state.enabledSecondPart}
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="DO"
                                value={this.state.secondPartTo}
                                minDate={this._getMinDate("secondPartTo")}
                                maxDate={this._getMaxDate("secondPartTo")}
                                onChange={this.handleChange("secondPartTo")}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.expanded === 'panel3'}
                                    onChange={this.handleChangePanel('panel3')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>Dovolená, státní svátek, služební cesta,
                                atd...</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                                eros, vitae egestas augue. Duis vel est augue.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this._handleClose} color="primary">Zrušit</Button>
                    <Button onClick={this._handleSave} disabled={!this.validate()} color="primary">Uložit</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

AgendaEditModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    dayTimeSheet: PropTypes.instanceOf(DayTimeSheet),
    user: PropTypes.instanceOf(User),
    handleClose: PropTypes.func.isRequired,
    handleOnSave: PropTypes.func.isRequired
};

export default withStyles(styles, {withTheme: true})(AgendaEditModal);
