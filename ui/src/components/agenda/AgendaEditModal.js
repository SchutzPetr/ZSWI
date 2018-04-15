import React from 'react';
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Typography from "material-ui/Typography";
import Modal from "material-ui/Modal";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, ExpansionPanel, ExpansionPanelDetails,
    ExpansionPanelSummary,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel, IconButton, Snackbar,
    Switch,
    TextField
} from "material-ui";

import {TimePicker} from 'material-ui-pickers';
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import CloseIcon from 'material-ui-icons/Close';
import DayTimeSheet from "../../entity/DayTimeSheet";
import moment from "moment";


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
});

class AgendaEditModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = AgendaEditModal.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            expanded: null,
            snackbar: false,
            snackbarText: "",
            date: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.date,
            firstPartFrom: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.firstPartFrom,
            firstPartTo: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.firstPartTo,
            firstPartType: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.firstPartType,
            secondPartFrom: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.secondPartFrom,
            secondPartTo: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.secondPartTo,
            secondPartType: nextProps.dayTimeSheet == null ? null : nextProps.dayTimeSheet.secondPartType,
        };
    }

    handleChangePanel = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : null
        });
    };

    handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({snackbar: false});
    };

    _handleSave = () =>{
        this.setState({
            expanded: null
        });

        let result = this.props.dayTimeSheet.clone();

        result.date = this.state.date;

        result.firstPartFrom = this.state.firstPartFrom;
        result.firstPartTo = this.state.firstPartTo;
        result.firstPartType = this.state.firstPartType;

        result.secondPartFrom = this.state.secondPartFrom;
        result.secondPartTo = this.state.secondPartTo;
        result.secondPartType = this.state.secondPartType;

        this.props.handleOnSave(result);
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

    render() {
        const {classes} = this.props;

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
                        <ExpansionPanelDetails>
                            <TimePicker
                                clearable
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="OD"
                                value={this.state.firstPartFrom}
                                onChange={this._handleFromDateChange(true)}
                            />
                            <TimePicker
                                clearable
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="DO"
                                value={this.state.firstPartTo}
                                onChange={this._handleToDateChange(true)}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.expanded === 'panel2'}
                                    onChange={this.handleChangePanel('panel2')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>Druhá část</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <TimePicker
                                clearable
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="OD"
                                value={this.state.secondPartFrom}
                                onChange={this._handleFromDateChange(false)}
                            />
                            <TimePicker
                                clearable
                                ampm={false}
                                keyboard={true}
                                mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                label="DO"
                                value={this.state.secondPartTo}
                                onChange={this._handleToDateChange(false)}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.expanded === 'panel3'}
                                    onChange={this.handleChangePanel('panel3')}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography className={classes.heading}>Dovolená, státní svátek, služební cesta, atd...</Typography>
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
                    <Button onClick={this._handleSave} color="primary">Uložit</Button>
                </DialogActions>
                <Snackbar
                    className={classes.snackbar}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.snackbar}
                    autoHideDuration={3000}
                    onClose={this.handleCloseSnackbar}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackbarText}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.snackbarClose}
                            onClick={this.handleCloseSnackbar}
                        >
                            <CloseIcon/>
                        </IconButton>,
                    ]}
                />
            </Dialog>
        );
    }
}

AgendaEditModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    dayTimeSheet: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOnSave: PropTypes.func.isRequired
};

export default withStyles(styles, {withTheme: true})(AgendaEditModal);
