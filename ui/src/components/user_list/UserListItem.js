import React from "react";
import PropTypes from "prop-types";
import {Avatar, IconButton, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core/index";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreVert from "@material-ui/icons/MoreVert";
import {Link} from 'react-router-dom'

class UserListItem extends React.Component {

    render() {
        return (
            <ListItem button={true} component={Link} to={`/agenda?user=${this.props.user.givenName}`}>
                <Avatar>
                    <AccountCircle/>
                </Avatar>
                <ListItemText primary={this.props.user.givenName} secondary={this.props.user.email}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Menu"
                                onClick={this.props.onOpen}>
                        <MoreVert/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

UserListItem.propTypes = {
    match: PropTypes.object.isRequired,
    onOpen: PropTypes.func.isRequired

};


export default UserListItem;
export {UserListItem};