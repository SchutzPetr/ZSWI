import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/NotificationItemStyle";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import DeleteIcon from "@material-ui/icons/es/Delete"
import {Link} from "react-router-dom";
import {ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core/index";

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