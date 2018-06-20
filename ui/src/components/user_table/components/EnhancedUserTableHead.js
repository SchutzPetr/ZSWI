import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableHead, TableRow} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "../style/EnhancedUserTableHeadStyle";

const columnDataNew = [
    {id: 'displayName', disablePadding: false, label: "Jméno a příjmení"},
    {id: 'mainWorkStation', disablePadding: false, label: "Pracovní umístění"},
    {id: 'role', disablePadding: false, label: "Role"},
    {id: 'status', disablePadding: false, label: "Status"},
];

class EnhancedUserTableHead extends React.Component {

    render() {
        return (
            <TableHead>
                <TableRow>
                    {columnDataNew.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                padding={column.disablePadding ? 'none' : 'default'}>
                                {column.label}
                            </TableCell>
                        );
                    }, this)}
                    <TableCell className={this.props.classes.edit}/>
                    <TableCell className={this.props.classes.edit}/>
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedUserTableHead.propTypes = {
    classes: PropTypes.object,
    rowCount: PropTypes.number.isRequired,
};

export default withStyles(Styles, {withTheme: true})(EnhancedUserTableHead);