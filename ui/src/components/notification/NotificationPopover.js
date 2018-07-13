import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/NotificationPopoverStyle";
import {List, Popover, Typography, IconButton} from "@material-ui/core/index";
import NotificationItem from "./NotificationItem";
import Notification from "../../entity/Notification";

import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";

class NotificationPopover extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            shown: false
        }
    };

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
                        <IconButton className={this.props.classes.iconButton} aria-label={this.state.shown ? "Zobrazit skryté": "Zobraz viditelné"}
                                    onClick={()=>{
                                        this.setState((prevState)=>{
                                            return {
                                                shown: !prevState.shown
                                            }
                                        })
                                    }}
                        >
                            {this.state.shown ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                    </div>
                    <div className={this.props.classes.content}>
                        <List>
                            {this.props.notifications.filter(value => value.shown === this.state.shown).map(value => {
                                return <NotificationItem key={`NotificationItem-${value.id}`} onNotificationUpdate={this.props.onNotificationUpdate(value)} notification={value}/>
                            })}
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
    onNotificationUpdate: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(Notification)
};

export default withStyles(Styles, {withTheme: true})(NotificationPopover);