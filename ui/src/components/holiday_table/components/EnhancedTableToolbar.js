import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {IconButton, Toolbar, Tooltip, Typography} from "material-ui";
import Styles from "./../style/EnhancedTableToolbarStyle";
import DeleteIcon from "material-ui-icons/es/Delete";
import AddIcon from "material-ui-icons/es/Add";

class EnhancedTableToolbar extends React.Component {

    render() {
        const {numSelected, classes} = this.props;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="title">Nutrition</Typography>
                    )}
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label="Filter list">
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </Toolbar>
        )
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object,
    numSelected: PropTypes.number.isRequired,
};
export default withStyles(Styles, {withTheme: true})(EnhancedTableToolbar);