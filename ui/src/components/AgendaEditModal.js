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

    state = {
        expanded: null,
        snackbar: false,
        snackbarText: "",
        selectedDate: new Date(),
        firstPartFrom: new Date(),
        firstPartTo: new Date(),
        secondPartFrom: new Date(),
        secondPartTo: new Date(),
    };

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

    _handleClose = () => {
        this.setState({
            expanded: null
        });
        this.props.handleClose();
    };

    _handleFromDateChange = firstPart => (date) => {
        if (firstPart) {
            this.setState(prevState => {
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
                                label="OD"
                                value={this.state.firstPartFrom}
                                onChange={this._handleFromDateChange(true)}
                            />
                            <TimePicker
                                clearable
                                ampm={false}
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
                                label="OD"
                                value={this.state.secondPartFrom}
                                onChange={this._handleFromDateChange(false)}
                            />
                            <TimePicker
                                clearable
                                ampm={false}
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
                    <Button onClick={this._handleClose} color="primary">Uložit</Button>
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
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(AgendaEditModal);
