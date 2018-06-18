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
import Forward from "@material-ui/icons/Forward";
import SimpleUser from "../../entity/SimpleUser";
import User from "../../entity/User";
import Attendance from "../../entity/Attendance";
import {Link} from "react-router-dom";

class SharedWithMe extends React.Component {

    _getRows() {
        return this.props.sharedWithOthers.map(value => {

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
                                        component={Link} to={`/shared-agenda/${value.id}`}>
                                <Forward/>
                            </IconButton></div>
                    </TableCell>
                </TableRow>
            );

        });
    }

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader title={"Sdíleno se mnou"}/>
                <CardContent>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    className={this.props.classes.tableHeaderFirst}>{"Jméno uživatele"}</TableCell>
                                <TableCell
                                    className={this.props.classes.tableHeaderSecond}>{"Přejít na výkaz"}</TableCell>
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

SharedWithMe.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool,
    sharedWithOthers: PropTypes.arrayOf(SimpleUser),
    authenticatedUser: PropTypes.instanceOf(User)
};

SharedWithMe.defaultProps = {
    sharedWithOthers: [],
};

export default withStyles(Styles, {withTheme: true})(SharedWithMe);