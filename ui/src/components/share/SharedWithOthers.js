import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/ShareStyle";
import {
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core/index";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Delete from "@material-ui/icons/Delete";
import SimpleUser from "../../entity/SimpleUser";
import User from "../../entity/User";
import ConfirmationDialog from "../confirm/ConfirmationDialog";

class SharedWithOthers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openConfirmValue: null,
            openConfirm: false,
        };
    }

    _getRows() {
        return this.props.sharedWithUserId.map(value => {

            return (
                <TableRow>
                    <TableCell>
                        <div className={this.props.classes.tableCellCenter}>
                            <AccountCircle className={this.props.classes.accountCircle}/>
                            <Typography variant={"body2"}>{value.displayFullName}</Typography>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className={this.props.classes.tableCellCenterJustifi}>
                            <IconButton aria-label={"Menu"}
                                        onClick={() => {
                                            this.setState({openConfirm: true, openConfirmValue: value});
                                        }}>
                                <Delete/>
                            </IconButton>
                        </div>
                    </TableCell>
                    <ConfirmationDialog
                        classes={{}}
                        title={"Smazání dovolené"}
                        text={"Přejete si smazat dovolenou?"}
                        open={this.state.openConfirm}
                        onCancel={() => {
                            this.setState({openConfirm: false, openConfirmValue: null});
                        }}
                        onConfirm={()=>{
                            this.setState({openConfirm: false, openConfirmValue: null});
                            this.props.onDeleteShare(value);
                        }}
                        value={this.state.openConfirmValue}
                    />
                </TableRow>
            );

        });
    }

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader title={"Sdíleno ostatním"}/>
                <CardContent>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.tableHeaderFirst}>{"Jméno uživatele"}</TableCell>
                                <TableCell
                                    className={this.props.classes.tableHeaderSecond}>{"Zrušit sdílení"}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this._getRows()}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
}

SharedWithOthers.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool,
    sharedWithUserId: PropTypes.arrayOf(SimpleUser),
    authenticatedUser: PropTypes.instanceOf(User),
    onDeleteShare: PropTypes.func.isRequired
};

SharedWithOthers.defaultProps = {
    sharedWithUserId: [],
};

export default withStyles(Styles, {withTheme: true})(SharedWithOthers);