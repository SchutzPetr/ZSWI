import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/NotificationPopoverStyle";
import {List, Popover, Typography} from "@material-ui/core/index";
import NotificationItem from "./NotificationItem";
import Notification from "../../entity/Notification";

class NotificationPopover extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Popover
                open={this.props.open}
                anchorEl={this.props.buttonRef}
                anchorReference={"anchorEl"}
                onClose={this.props.onClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <div className={this.props.classes.root}>
                    <div className={this.props.classes.header}>
                        <Typography className={this.props.classes.typography}>Oznámení</Typography>
                    </div>
                    <div className={this.props.classes.content}>
                        <List>
                            {this.props.notifications.map(value => {
                                return <NotificationItem key={`NotificationItem-${value.id}`} notification={value}/>
                            })};
                        </List>
                    </div>
                </div>
            </Popover>
        )
    }
}

NotificationPopover.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    buttonRef: PropTypes.any,
    notifications: PropTypes.arrayOf(Notification)
};

export default withStyles(Styles, {withTheme: true})(NotificationPopover);