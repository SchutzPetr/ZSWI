import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import {IconButton, Toolbar, Tooltip, Typography} from "@material-ui/core/index";
import Styles from "../style/EnhancedUserTableProjectAssignmentToolbarStyle";
import AddIcon from "@material-ui/icons/es/Add";
import Project from "../../../entity/Project";

class EnhancedUserTableProjectAssignmentToolbar extends React.Component {

    render() {
        return (
            <Toolbar
                className={this.props.classes.root}>
                <div className={this.props.classes.title}>
                    <Typography variant="title">{`Uživatelé pracující na projektu: ${this.props.project.projectNameShort}`}</Typography>
                </div>
                <div className={this.props.classes.spacer}/>
                <div className={this.props.classes.actions}>
                    <Tooltip title={"Přidat uživatele"}>
                        <IconButton aria-label={"Přidat uživatele"} onClick={this.props.onAddClick(null)}>
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
    onAddClick: PropTypes.func.isRequired,
    project: PropTypes.instanceOf(Project),
};
export default withStyles(Styles, {withTheme: true})(EnhancedUserTableProjectAssignmentToolbar);