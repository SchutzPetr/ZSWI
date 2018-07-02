import React from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import HolidayToPrint from "./HolidayToPrint";
import {Button, Dialog, DialogContent, DialogActions} from "@material-ui/core/index";
import SharedVariable from "../../SharedVariable";
import moment from "moment/moment";
import Calls from "../../Calls";
import {Link} from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import User from "../../entity/User";
import HolidayRowRecord from "../../entity/HolidayRowRecord";
import Styles from "./style/HolidayPrintStyle"

class HolidayPrint extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Dialog className={this.props.classes.dialog} onClose={this.handleClose} open={this.props.open} aria-labelledby={"simple-dialog-title"}>
                <DialogContent>
                    <HolidayToPrint ref={el => this.componentRef = el} user={this.props.user} holidayRowRecord={this.props.holidayRowRecord}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color={"primary"}>
                        Zrušit
                    </Button>
                    <ReactToPrint
                        trigger={() => <Button color={"primary"}>Tisk</Button>}
                        content={() => this.componentRef}
                        onAfterPrint={this.props.handleClose}
                    />
                </DialogActions>
            </Dialog>
        );
    }
}

HolidayPrint.propTypes = {
    classes: PropTypes.object,
    user: PropTypes.instanceOf(User),
    holidayRowRecord: PropTypes.instanceOf(HolidayRowRecord),
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};

export default withStyles(Styles, {withTheme: true})(HolidayPrint);