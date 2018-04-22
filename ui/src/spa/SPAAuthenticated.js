import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import {withStyles} from "material-ui/styles";
import classNames from "classnames";

import MenuIcon from "material-ui-icons/Menu";
import ChevronLeftIcon from "material-ui-icons/ChevronLeft";
import {AppBar, Badge, Divider, Drawer, Hidden, IconButton, List, Toolbar, Typography} from "material-ui";

import Styles from "./style/SPAAuthenticatedStyle";
import AgendaOverview from "../use_cases/uc_agenda_overview/AgendaOverview";

import {secretaryMenuItems, otherMailFolderListItems} from "./SPAAuthenticatedMenuItems";
import Home from "../use_cases/uc_home/Home";
import Notifications from "material-ui-icons/es/Notifications";
import NotificationPopover from "../components/notification/NotificationPopover";
import Share from "../use_cases/uc_share/SharePage";
import UserHolidayPage from "../use_cases/uc_user_holiday/UserHolidayPage";
import ManageHolidayPage from "../use_cases/uc_manage_holidays/ManageHolidayPage";


class SPAAuthenticated extends React.Component {

    state = {
        open: false,
        notifi: 5,
        notificationPopoverOpen: false
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    onNotificationPopoverClose = () => {
        this.setState({
            notificationPopoverOpen: false,
        });
    };

    onNotificationPopoverOpen = () => {
        this.setState({
            notificationPopoverOpen: true,
        });
    };

   notificationButtonRef = null;

    render() {
        const {classes, theme} = this.props;

        return (
            <div className={classes.root + " layout-root"}>
                <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.state.open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Správce docházky
                        </Typography>
                        <IconButton color="inherit"
                                    className={classes.notifiButton}
                                    buttonRef={node => {
                                        this.notificationButtonRef = node;
                                    }}
                                    onClick={this.onNotificationPopoverOpen}>
                            {this.state.notifi ?
                                <Badge color="secondary" badgeContent={this.state.notifi}>
                                    <Notifications/>
                                </Badge> :
                                <Notifications/>}
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <NotificationPopover open={this.state.notificationPopoverOpen} buttonRef={this.notificationButtonRef} onClose={this.onNotificationPopoverClose}/>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === "rtl" ? "right" : "left"}
                        open={this.state.open}
                        onClose={this.handleDrawerClose}
                        classes={{
                            paper: classes.drawerPaperMobile,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {secretaryMenuItems}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                        }}
                        open={this.state.open}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon/>
                            </IconButton>
                        </div>
                        <Divider/>
                        <List>{secretaryMenuItems(classes)}</List>
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <Route path={"/"} exact={true}
                           render={props => (
                               <Home match={props.match}/>
                           )}/>
                    <Route path={"/agenda"} exact={true}
                           render={props => (
                               <AgendaOverview match={props.match}/>
                           )}/>
                    <Route path={"/share"} exact={true}
                           render={props => (
                               <Share/>
                           )}/>
                    <Route path={"/holiday"} exact={true}
                           render={props => (
                               <UserHolidayPage/>
                           )}/>
                    <Route path={"/manage-holidays"} exact={true}
                           render={props => (
                               <ManageHolidayPage match={props.match}/>
                           )}/>
                </main>
            </div>
        );
    }
}

SPAAuthenticated.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired
};

export default withStyles(Styles, {withTheme: true})(SPAAuthenticated);