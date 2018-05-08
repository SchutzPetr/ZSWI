import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {IconButton, Toolbar, Tooltip, Typography} from "material-ui";
import Styles from "../style/EnhancedUserTableProjectAssignmentToolbarStyle";
import AddIcon from "material-ui-icons/es/Add";

class EnhancedUserTableProjectAssignmentToolbar extends React.Component {

    render() {
        return (
            <Toolbar
                className={this.props.classes.root}>
                <div className={this.props.classes.title}>
                    <Typography variant="title">Správa uživatelů</Typography>
                </div>
                <div className={this.props.classes.spacer}/>
                <div className={this.props.classes.actions}>
                    <Tooltip title={"Přidat dovolenou"}>
                        <IconButton aria-label={"Přidat dovolenou"} onClick={this.props.onEditClick(null)}>
                            <AddIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </Toolbar>
        )
    }
}

EnhancedUserTableProjectAssignmentToolbar.propTypes = {
    classes: PropTypes.object,
    onEditClick: PropTypes.func.isRequired
};
export default withStyles(Styles, {withTheme: true})(EnhancedUserTableProjectAssignmentToolbar);