import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles/index';
import {withRouter} from 'react-router-dom'
import {IconButton, Toolbar, Tooltip, Typography} from "@material-ui/core/index";
import Styles from "./../style/EnhancedTableToolbarStyle";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import HolidayCreateModal from "../../holiday_create_modal/HolidayCreateModal";
import User from "../../../entity/User";
import Suggestion from "../../autocomplete/entity/Suggestion";
import SingleSelect from "../../autocomplete/SingleSelect";
import Calls from "../../../Calls";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core/index";

class EnhancedTableToolbar extends React.Component {

    state = {
        year: 2018
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

    static generateYears() {
        let x = [];

        for (let i = 2018; i < 2050; i++) {
            x.push(<MenuItem value={i}>{i}</MenuItem>)
        }

        return x;
    }

    handleSelect = (event) => {
        if (event) {
            this.props.history.push(`/manage-holidays/${event.data.id}/${this.props.year}`);
        } else {
            this.props.history.push(`/manage-holidays/${null}/${this.props.year}`);
        }
    };

    handleChangeYear(event) {
        if (this.props.mode === "USER") {
            if (event) {
                this.props.history.push(`/holiday/${event.target.value}`);
            } else {
                this.props.history.push(`/holiday/${new Date().getFullYear()}`);
            }
        } else {
            if (event) {
                this.props.history.push(`/manage-holidays/${this.props.user ? this.props.user.id : null}/${event.target.value}`);
            } else {
                this.props.history.push(`/manage-holidays/${this.props.user ? this.props.user.id : null}/${new Date().getFullYear()}`);
            }
        }
    }

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
                <div className={classes.wrapper}>
                    <div className={classes.singleSelect}>
                        <SingleSelect value={EnhancedTableToolbar.mapUserToSuggestion(this.props.user)}
                                      suggestions={EnhancedTableToolbar.mapUsersToSuggestion(this.props.users)}
                                      onSelect={this.handleSelect} disabled={this.props.mode === "USER"}/>
                    </div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-simple">Age</InputLabel>
                        <Select
                            value={this.props.year}
                            onChange={this.handleChangeYear.bind(this)}
                            inputProps={{
                                name: 'year',
                                id: 'year',
                            }}
                        >
                            {EnhancedTableToolbar.generateYears()}
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete" onClick={this.onDeleteSelected}>
                                <DeleteIcon/>
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title={this.props.user ? "Přidat dovolenou" : "Nejprve vyber uživatele"}>
                            <div>
                                <IconButton aria-label={"Přidat dovolenou"} disabled={!this.props.user}
                                            onClick={this.props.handleOpenHolidayCreateModal}>
                                    <AddIcon/>
                                </IconButton>
                            </div>
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
    onDeleteSelected: PropTypes.func.isRequired,
    handleOpenHolidayCreateModal: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(User).isRequired,
    user: PropTypes.instanceOf(User),
    year: PropTypes.number,
    mode: PropTypes.string,
};

EnhancedTableToolbar.defaultProps = {
    user: null,
    users: [],
};
export default withStyles(Styles, {withTheme: true})(withRouter(EnhancedTableToolbar));