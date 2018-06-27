import React from "react";
import PropTypes from "prop-types";

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core/index";
import withStyles from "@material-ui/core/styles/withStyles";
import Styles from "./style/ConfirmationDialogStyle";


class ConfirmationDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
                disableBackdropClick={true}
                disableEscapeKeyDown={true}
                maxWidth={"xs"}
                aria-labelledby={"confirmation-dialog-title"}
                open={this.props.open}
            >
                <DialogTitle id={"confirmation-dialog-title"}>{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{this.props.text}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onCancel} color={"primary"}>
                        Zrušit
                    </Button>
                    <Button onClick={() => {
                        this.props.onConfirm(this.props.value)
                    }} color={"primary"}>
                        Potvrdit
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmationDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
    value: PropTypes.any,
};

export default withStyles(Styles, {withTheme: true})(ConfirmationDialog);
