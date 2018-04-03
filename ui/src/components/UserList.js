import React from "react";
import PropTypes from "prop-types";
import User from "../entity/User";
import {IconButton, Input, List, Paper} from "material-ui";
import UserListItem from "./UserListItem";
import {withStyles} from "material-ui/styles";
import ExpansionUserFilter from "./ExpansionUserFilter";
import FilterListIcon from "material-ui-icons/FilterList";

import {darken, fade, lighten} from "material-ui/styles/colorManipulator";
import FilterModal from "./FilterModal";


const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        maxHeight: `calc(100vh - 177px)`
    },
    listSection: {
        backgroundColor: "inherit",
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0,
    },
    input: {
        width: "calc(80% - " + 2* theme.spacing.unit + "px)",
        margin: theme.spacing.unit,
        marginLeft: 0
    },
    filterWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottom: `1px solid ${
            theme.palette.type === "light"
                ? lighten(fade(theme.palette.divider, 1), 0.88)
                : darken(fade(theme.palette.divider, 1), 0.8)
            }`
    }
});

class UserList extends React.Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <Paper>
                <FilterModal open={this.state.open} handleClose={this.handleClose.bind(this)}/>
                <div className={this.props.classes.filterWrapper}>
                    <Input
                        defaultValue=""
                        className={this.props.classes.input}
                        inputProps={{
                            "aria-label": "Search",
                        }}
                    />
                    <IconButton aria-label="Filter" onClick={this.handleOpen.bind(this)}>
                        <FilterListIcon />
                    </IconButton>
                </div>
                <List className={this.props.classes.root}>
                    {this.props.users.map((value, index) => <UserListItem key={"user-list-item-" + value.email + index}
                                                                          match={this.props.match} user={value}/>)}
                </List>
            </Paper>
        );
    }
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    users: PropTypes.array.isRequired,
};
export default withStyles(styles)(UserList);