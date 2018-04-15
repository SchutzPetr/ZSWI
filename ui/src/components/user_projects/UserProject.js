import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Styles from "./style/UserProjectStyle";
import LinearProgress from "material-ui/es/Progress/LinearProgress";
import {
    Typography,
    Paper,
    CardContent,
    Card,
    CardHeader,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "material-ui";
import moment from "moment";

class UserProject extends React.Component {

    render() {
        return (
            <Card className={this.props.classes.root}>
                <CardHeader title="Aktualní projekty"/>
                <CardContent>
                    <Table className={""}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Název projektu</TableCell>
                                <TableCell>DO</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Projekt 1</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 2</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 3</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 4</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 5</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 6</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 7</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 6</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 7</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 6</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Projekt 7</TableCell>
                                <TableCell>{moment().format("LL")}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
}

UserProject.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool
};

export default withStyles(Styles, {withTheme: true})(UserProject);