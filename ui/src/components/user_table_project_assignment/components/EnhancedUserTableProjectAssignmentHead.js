import React from 'react';
import PropTypes from 'prop-types';
import {TableCell, TableHead, TableRow} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "../style/EnhancedUserTableProjectAssignmentHeadStyle";

const columnDataNew = [
    {id: 'displayName', disablePadding: false, label: "Jméno a příjmení"},
    {id: 'activeFrom', disablePadding: false, label: "Od"},
    {id: 'activeTo', disablePadding: false, label: "Do"},
    {id: 'obligation', disablePadding: false, label: "Velikost úvazku"},
];

class EnhancedUserTableProjectAssignmentHead extends React.Component {

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
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedUserTableProjectAssignmentHead.propTypes = {
    classes: PropTypes.object,
    rowCount: PropTypes.number.isRequired,
};

export default withStyles(Styles, {withTheme: true})(EnhancedUserTableProjectAssignmentHead);