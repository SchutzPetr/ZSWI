import React from "react";
import PropTypes from "prop-types";
import {Avatar, ListItem, ListItemText} from "material-ui";
import AccountCircle from "material-ui-icons/AccountCircle";
import User from "../entity/User";

class UserListItem extends React.Component {

    render() {
        return (
            <ListItem button={true}>
                <Avatar>
                    <AccountCircle/>
                </Avatar>
                <ListItemText primary={this.props.user.givenName} secondary={this.props.user.email}/>
            </ListItem>
        );
    }
}
UserListItem.propTypes = {
    match: PropTypes.object.isRequired,

};


export default UserListItem;
export {UserListItem};