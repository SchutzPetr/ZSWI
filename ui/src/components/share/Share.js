import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
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
} from "material-ui";
import AccountCircle from "material-ui-icons/es/AccountCircle";
import Forward from "material-ui-icons/es/Forward";

class Share extends React.Component {

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader title="Sdílet"/>
                <CardContent>
                </CardContent>
            </Card>
        )
    }
}

Share.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool
};

export default withStyles(Styles, {withTheme: true})(Share);