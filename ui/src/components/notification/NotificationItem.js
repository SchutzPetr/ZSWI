import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Styles from "./style/NotificationItemStyle";
import ListItem from "material-ui/es/List/ListItem";
import ListItemAvatar from "material-ui/es/List/ListItemAvatar";
import Avatar from "material-ui/es/Avatar/Avatar";
import ListItemText from "material-ui/es/List/ListItemText";
import ListItemSecondaryAction from "material-ui/es/List/ListItemSecondaryAction";
import IconButton from "material-ui/es/IconButton/IconButton";
import DeleteIcon from "material-ui-icons/es/Delete"
import {Link} from "react-router-dom";

class NotificationItem extends React.Component {

    render() {

        let listItemProps;

        if(this.props.link){
            listItemProps = {
                button: true,
                component: Link,
                to: this.props.link
            };
        }

        return (
            <ListItem {...listItemProps}>
                <ListItemText
                    primary={this.props.title}
                    secondary={this.props.description}
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    link: PropTypes.string,
    onDelete: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default withStyles(Styles, {withTheme: true})(NotificationItem);