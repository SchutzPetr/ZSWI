import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./../style/UserContractContentStyle";
import UserContract from "../../../entity/UserContract";
import {DatePicker} from "material-ui-pickers";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    TextField,
    Typography
} from "@material-ui/core/index";

class UserContractContent extends React.PureComponent {

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.container}>
                <Typography className={classes.title} variant={"headline"}>{"Úvazek"}</Typography>
                <div className={classes.row}>
                    <DatePicker
                        className={classes.datePicker}
                        keyboard={true}
                        label={"Platnost Od"}
                        format={"DD/MM/YYYY"}
                        placeholder={"10/10/2018"}
                        // handle clearing outside => pass plain array if you are not controlling value outside
                        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                        onChange={this.props.handleChangeCurrent("activeFrom")}
                        animateYearScrolling={false}
                        value={this.props.currentUserContract.activeFrom}
                        maxDate={this.props.currentUserContract.activeTo ? this.props.currentUserContract.activeTo : new Date(2100, 1, 1)}
                    />
                    <DatePicker
                        className={classes.datePicker}
                        keyboard={true}
                        clearable={true}
                        label={"Platnost Do"}
                        format={"DD/MM/YYYY"}
                        placeholder={"10/10/2018"}
                        // handle clearing outside => pass plain array if you are not controlling value outside
                        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                        onChange={this.props.handleChangeCurrent("activeTo")}
                        animateYearScrolling={false}
                        value={this.props.currentUserContract.activeTo}
                        minDate={this.props.currentUserContract.activeFrom}
                    />
                    <TextField
                        className={classes.textField}
                        required={true}
                        id={"obligationKIV"}
                        label={"Velikost úvazku KIV"}
                        margin={"normal"}
                        type="number"
                        value={this.props.currentUserContract.obligationKIV}
                        onChange={this.props.handleChangeCurrent("obligationKIV")}
                    />
                    <TextField
                        className={classes.textField}
                        required={true}
                        id={"obligationNTIS"}
                        label={"Velikost úvazku NTIS"}
                        margin={"normal"}
                        type="number"
                        value={this.props.currentUserContract.obligationNTIS}
                        onChange={this.props.handleChangeCurrent("obligationNTIS")}
                    />
                </div>
                {this.props.futureUserContract.length === 0 ? null :
                    <ExpansionPanel className={classes.expansionPanel}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography>{"Budoucí úvazky"}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.row2Wrapper}>
                            {this.props.futureUserContract.map((value, index) => {
                                return (<div className={classes.row2}>
                                    <DatePicker
                                        className={classes.datePicker2}
                                        keyboard={true}
                                        label={"Platnost Od"}
                                        format={"DD/MM/YYYY"}
                                        placeholder={"10/10/2018"}
                                        // handle clearing outside => pass plain array if you are not controlling value outside
                                        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                        onChange={this.props.handleChangeFuture("activeFrom")}
                                        animateYearScrolling={false}
                                        value={value.activeFrom}
                                        disabled={true}
                                    />
                                    <DatePicker
                                        className={classes.datePicker2}
                                        keyboard={true}
                                        label={"Platnost Do"}
                                        format={"DD/MM/YYYY"}
                                        placeholder={"10/10/2018"}
                                        // handle clearing outside => pass plain array if you are not controlling value outside
                                        mask={value => (value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : [])}
                                        onChange={this.props.handleChangeFuture("activeFrom")}
                                        animateYearScrolling={false}
                                        value={value.activeFrom}
                                        disabled={true}
                                    />
                                    <TextField
                                        className={classes.textField2}
                                        required={true}
                                        id={"obligationKIV"}
                                        label={"Velikost úvazku KIV"}
                                        margin={"normal"}
                                        type="number"
                                        value={value.obligationKIV}
                                        onChange={this.props.handleChangeFuture("obligationKIV")}
                                        disabled={true}
                                    />
                                    <TextField
                                        className={classes.textField2}
                                        required={true}
                                        id={"obligationNTIS"}
                                        label={"Velikost úvazku NTIS"}
                                        margin={"normal"}
                                        type="number"
                                        value={value.obligationNTIS}
                                        onChange={this.props.handleChangeFuture("obligationNTIS")}
                                        disabled={true}
                                    />
                                </div>)
                            })}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                }
            </div>
        )
    }
}

UserContractContent.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUserContract: PropTypes.instanceOf(UserContract).isRequired,
    futureUserContract: PropTypes.arrayOf(UserContract).isRequired,
    handleChangeCurrent: PropTypes.func.isRequired,
    handleChangeFuture: PropTypes.func.isRequired,
};

UserContractContent.defaultProps = {
    handleChangeCurrent: () => {
    },
    handleChangeFuture: () => {
    },
    futureUserContract: []
};

export default withStyles(Styles, {withTheme: true})(UserContractContent);