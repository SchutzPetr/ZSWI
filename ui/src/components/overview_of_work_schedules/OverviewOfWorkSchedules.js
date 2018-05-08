import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Styles from "./style/OverviewOfWorkSchedulesStyle";
import {Paper, Table, TableBody, TableCell, TableHead, TableRow} from "material-ui";
import moment from "moment";

class OverviewOfWorkSchedules extends React.Component {
    state = {};

    handleChange = event => {
    };


    handleSelectOpen = () => {
    };

    _getRow = () => {
        let rows = [];
        for (let i = 0; i < 50; i++) {
            rows.push(
                <TableRow style={{height: 49}}>
                    <TableCell>{`Zaměstnanec${i}`}</TableCell>
                    <TableCell colSpan={24}/>
                </TableRow>
            );
        }
        return rows;
    };

    _tableHeader = () => {
        let headerColumns = [<TableCell>{`Zaměstnanec`}</TableCell>];
        for (let i = 0; i < 12; i++) {
            headerColumns.push(<TableCell><p className={this.props.classes.vertical}>{moment().month(i).format("MMMM")}</p></TableCell>);
        }

        for (let i = 0; i < 12; i++) {
            headerColumns.push(<TableCell><p className={this.props.classes.vertical}>{`Projekt${i}`}</p></TableCell>);
        }
        //headerColumns.map(value => value);
        return headerColumns;
    };


    render() {
        return (
            <Paper className={this.props.classes.root}>
                <Table className={""}>
                    <TableHead>
                        <TableRow>
                            {this._tableHeader()}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this._getRow()}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

OverviewOfWorkSchedules.propTypes = {
    classes: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    edit: PropTypes.bool,
    minDate: PropTypes.bool,
};

export default withStyles(Styles, {withTheme: true})(OverviewOfWorkSchedules);