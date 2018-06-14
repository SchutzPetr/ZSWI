import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles/index';
import { withRouter } from 'react-router-dom'
import {IconButton, Toolbar, Tooltip, Typography} from "@material-ui/core/index";
import Styles from "./../style/EnhancedTableToolbarStyle";
import DeleteIcon from "@material-ui/icons/es/Delete";
import AddIcon from "@material-ui/icons/es/Add";
import HolidayCreateModal from "../../holiday_create_modal/HolidayCreateModal";
import User from "../../../entity/User";
import Suggestion from "../../autocomplete/entity/Suggestion";
import SingleSelect from "../../autocomplete/SingleSelect";

class EnhancedTableToolbar extends React.Component {

    state = {
        holidayCreateModal: false
    };

    static mapUserToSuggestion(user) {
        if (!user) {
            return null;
        }
        return new Suggestion(user.id, user.displayFullName, user)
    }

    static mapUsersToSuggestion(user) {
        return user.map(value => this.mapUserToSuggestion(value));
    }

    handleSelect = (value) => {
        if(value){
            this.props.history.push(`/manage-holidays/${value.data.id}`);
        }else{
            this.props.history.push(`/manage-holidays/`);
        }
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
                <div className={classes.singleSelect}>
                    <SingleSelect value={EnhancedTableToolbar.mapUserToSuggestion(this.props.user)}
                                  suggestions={EnhancedTableToolbar.mapUsersToSuggestion(this.props.users)}
                                  onSelect={this.handleSelect}/>
                </div>
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
    onDeleteSelected: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(User).isRequired,
    user: PropTypes.instanceOf(User),
};

EnhancedTableToolbar.defaultProps = {
    user: null,
    users: [],
};
export default withStyles(Styles, {withTheme: true})(withRouter(EnhancedTableToolbar));