import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from 'material-ui/styles';
import {IconButton, Toolbar, Tooltip, Typography} from "material-ui";
import Styles from "./../style/EnhancedTableToolbarStyle";
import DeleteIcon from "material-ui-icons/es/Delete";
import AddIcon from "material-ui-icons/es/Add";
import HolidayCreateModal from "../../holiday_create_modal/HolidayCreateModal";

class EnhancedTableToolbar extends React.Component {

    state = {
        holidayCreateModal: false
    };

    handleCloseHolidayCreateModal = () => {
        this.setState({holidayCreateModal: false});
    };

    handleSaveHolidayCreateModal = values => {
        this.handleCloseHolidayCreateModal();
    };

    handleOpenHolidayCreateModal = () => {
        this.setState({holidayCreateModal: true});
    };

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
                        <Typography variant="title">Dovolená</Typography>
                    )}
                </div>
                <div className={classes.spacer}/>
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete" onClick={this.onDeleteSelected}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton aria-label={"Přidat dovolenou"} onClick={this.handleOpenHolidayCreateModal}>
                                <AddIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
                <HolidayCreateModal open={this.state.holidayCreateModal} onClose={this.handleCloseHolidayCreateModal} onSave={this.handleSaveHolidayCreateModal}/>
            </Toolbar>
        )
    }
}

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object,
    numSelected: PropTypes.number.isRequired,
    onDeleteSelected: PropTypes.func.isRequired
};
export default withStyles(Styles, {withTheme: true})(EnhancedTableToolbar);