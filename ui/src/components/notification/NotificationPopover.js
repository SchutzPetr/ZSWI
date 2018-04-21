import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Styles from "./style/NotificationPopoverStyle";
import {List, Paper, Popover, Typography} from "material-ui";
import NotificationItem from "./NotificationItem";

class NotificationPopover extends React.Component {

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
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}} link={"http://localhost:3000/holiday"}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
                            <NotificationItem title={"test"} description={"sss"} onClick={()=>{}} onDelete={()=>{}}/>
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
    buttonRef: PropTypes.any
};

export default withStyles(Styles, {withTheme: true})(NotificationPopover);