import React from 'react';
import PropTypes from 'prop-types';
import {Checkbox, TableCell, TableHead, TableRow} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./../style/EnhancedTableHeadStyle";

const columnDataNew = [
    {id: 'date', disablePadding: true, label: "Datum"},
    {id: 'typ', disablePadding: false, label: 'Typ'},
];

class EnhancedTableHead extends React.Component {

    render() {
        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={this.props.numSelected > 0 && this.props.numSelected < this.props.rowCount}
                            checked={this.props.numSelected === this.props.rowCount && this.props.numSelected !== 0}
                            onChange={() => {
                                this.props.onSelectAllChange(this.props.numSelected !== this.props.rowCount)
                            }}
                        />
                    </TableCell>
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
                    <TableCell className={this.props.classes.delete}/>
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object,
    numSelected: PropTypes.number.isRequired,
    onSelectAllChange: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default withStyles(Styles, {withTheme: true})(EnhancedTableHead);