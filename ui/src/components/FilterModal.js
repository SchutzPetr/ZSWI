import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel,
    FormGroup, FormLabel,
    Switch,
    TextField
} from "material-ui";


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class FilterModal extends React.Component {

    state = {
        KIV: true,
        NTIS: true,
        INACTIVE: false,
    };

    handleChange(type, checked) {
        this.setState(prevState => {

            let newState = Object.assign({}, prevState);
            newState[type] = checked;

            return {...newState}
        })
    }

    clearFilter() {
        this.setState({
            KIV: true,
            NTIS: true,
            INACTIVE: false,
        }, () => {
            this.props.handleClose();
        });
    }

    render() {
        const {classes} = this.props;

        return (

            <Dialog
                open={this.props.open}
                onClose={this.clearFilter.bind(this)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Nastavení filtrů</DialogTitle>
                <DialogContent>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Zobrazení zaměstnanců</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.KIV}
                                        onChange={(event, checked) => this.handleChange('KIV', checked)}
                                        value="KIV"
                                    />
                                }
                                label="Zobrazit zaměstnance KIV"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.NTIS}
                                        onChange={(event, checked) => this.handleChange('NTIS', checked)}
                                        value="NTIS"
                                    />
                                }
                                label="Zobrazit zaměstnance NTIS"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={this.state.INACTIVE}
                                        onChange={(event, checked) => this.handleChange('INACTIVE', checked)}
                                        value="INACTIVE"
                                    />
                                }
                                label="Zobrazit neaktivní zaměstnance"
                            />
                        </FormGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.clearFilter.bind(this)} color="primary">Vyčistit filtr</Button>
                    <Button onClick={this.props.handleClose} color="primary">Filtrovat</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

FilterModal.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(FilterModal);
