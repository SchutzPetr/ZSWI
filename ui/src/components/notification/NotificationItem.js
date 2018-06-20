import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/NotificationItemStyle";
import IconButton from "@material-ui/core/IconButton/IconButton";
import DeleteIcon from "@material-ui/icons/Delete"
import {Link} from "react-router-dom";
import {ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core/index";
import Notification from "../../entity/Notification";

class NotificationItem extends React.Component {

    render() {

        let listItemProps;

        if(this.props.notification.link){
            listItemProps = {
                button: true,
                component: Link,
                to: this.props.link
            };
        }

        return (
            <ListItem {...listItemProps}>
                <ListItemText
                    primary={this.props.notification.title}
                    secondary={this.props.notification.description}
                />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

NotificationItem.propTypes = {
    classes: PropTypes.object.isRequired,
    notification: PropTypes.instanceOf(Notification).isRequired,
};

export default withStyles(Styles, {withTheme: true})(NotificationItem);