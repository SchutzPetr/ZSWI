import React from "react";
import PropTypes from "prop-types";
import {Paper} from "@material-ui/core/index";
import {withStyles} from "@material-ui/core/styles/index";
import Style from "./style/UserListStyle";

import SingleSelect from "../autocomplete/SingleSelect";
import Suggestion from "../autocomplete/entity/Suggestion";
import User from "../../entity/User";


class UserList extends React.Component {

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
            this.props.history.push(`/agenda/${value.data.id}`);
        }else{
            this.props.history.push(`/agenda/`);
        }
    };

    render() {
        //<FilterModal open={this.state.open} handleClose={this.handleClose.bind(this)}/>
        /*
        <Input
                        defaultValue=""
                        className={this.props.classes.input}
                        inputProps={{
                            "aria-label": "Search",
                        }}
                        endAdornment={
                            <IconButton aria-label="Filter" onClick={this.handleOpen.bind(this)}>
                                <FilterListIcon />
                            </IconButton>
                        }
                    />
         */
        return (
            <Paper>
                <div className={this.props.classes.filterWrapper}>
                    <SingleSelect value={UserList.mapUserToSuggestion(this.props.user)}
                                  suggestions={UserList.mapUsersToSuggestion(this.props.users)}
                                  onSelect={this.handleSelect}/>
                </div>
            </Paper>
        );
    }
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.instanceOf(User).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
};
export default withStyles(Style, {withTheme: true})(UserList);