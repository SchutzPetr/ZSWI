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
import AccountCircle from "@material-ui/icons/es/AccountCircle";
import Forward from "@material-ui/icons/es/Forward";

class SharedWithOthers extends React.Component {

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader title="Sdíleno se mnou"/>
                <CardContent>
                    <Table className={this.props.classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={this.props.classes.tableHeaderFirst}>{"Jméno uživatele"}</TableCell>
                                <TableCell className={this.props.classes.tableHeaderSecond}>{"Přejít na výkaz"}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className={this.props.classes.tableCellCenter}>
                                        <AccountCircle className={this.props.classes.accountCircle}/>
                                        <Typography variant={"body2"}>{"Petr Schutz"}</Typography>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className={this.props.classes.tableCellCenterJustifi}>
                                        <IconButton aria-label="Menu"
                                                    onClick={() => {
                                                    }}>
                                            <Forward/>
                                        </IconButton></div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
}

SharedWithOthers.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool
};

export default withStyles(Styles, {withTheme: true})(SharedWithOthers);