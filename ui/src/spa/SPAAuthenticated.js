import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles/index";
import classNames from "classnames";

import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
    AppBar,
    Badge,
    Divider,
    Drawer,
    Hidden,
    IconButton,
    List,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core/index";

import Styles from "./style/SPAAuthenticatedStyle";
import AgendaOverview from "../use_cases/uc_agenda_overview/AgendaOverview";

import {secretaryMenuItems, userMenuItems} from "./SPAAuthenticatedMenuItems";
import Home from "../use_cases/uc_home/Home";
import Notifications from "@material-ui/icons/Notifications";
import ExitToApp from "@material-ui/icons/ExitToApp";
import NotificationPopover from "../components/notification/NotificationPopover";
import SharePage from "../use_cases/uc_share/SharePage";
import UserHolidayPage from "../use_cases/uc_user_holiday/UserHolidayPage";
import ManageHolidayPage from "../use_cases/uc_manage_holidays/ManageHolidayPage";
import ProjectOverviewPage from "../use_cases/uc_project_overview/ProjectOverviewPage";
import OverviewOfWorkSchedulesPage from "../use_cases/uc_overview_of_work_schedules/OverviewOfWorkSchedulesPage";
import UserManagementPage from "../use_cases/uc_user_management/UserManagementPage";
import User from "../entity/User";
import SharedAgendaOverviewPage from "../use_cases/uc_shared_agenda_overview/SharedAgendaOverviewPage";
import Notification from "../entity/Notification";
import Calls from "../Calls";


class SPAAuthenticated extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            notifications: [],
            notificationPopoverOpen: false
        };
    }

    componentDidMount() {
        this._fetch();

        setInterval (() => {
                Calls.getAllNotification({
                    data: {}, //todo: year
                    done: (data) => {
                        this.setState({notifications: Notification.map(data.data), loadFeedback: "ready"});
                    },
                    fail: (data) => {
                        this.setState({loadFeedback: "error"});
                        //todo: error throw
                    }
                });
            }, 30*1000
        );
    };

    onNotificationUpdate = (notification) => event => {
        this.setState((prevState) => {

            let notifications = Notification.map(prevState.notifications);
            let index = notifications.findIndex(value => value.id === notification.id);
            notifications[index].shown = !notification.shown;

            return {
                notifications: notifications
            }
        }, ()=>{
            notification.shown = !notification.shown;

            Calls.updateNotification({
                data: notification, //todo: year
                done: (data) => {},
                fail: (data) => {}
            });
        });
    };

    _fetch() {
        if (this.props.authenticatedUser.authority === "ADMIN" || this.props.authenticatedUser.authority === "SECRETARY") {
            Calls.getAllNotification({
                data: {}, //todo: year
                done: (data) => {
                    this.setState({notifications: Notification.map(data.data), loadFeedback: "ready"});
                },
                fail: (data) => {
                    this.setState({loadFeedback: "error"});
                    //todo: error throw
                }
            });
        }
    }

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

    _routeSwitch() {
        if (this.props.authenticatedUser.authority === "USER") {
            return (
                <Switch>

                    <Route path={"/"} exact={true}
                           render={props => (
                               <Home authenticatedUser={this.props.authenticatedUser} match={props.match}/>
                           )}/>
                    <Route path={"/share"} exact={true}
                           render={props => (
                               <SharePage authenticatedUser={this.props.authenticatedUser}/>
                           )}/>
                    <Route path={"/holiday/:year?"} exact={true}
                           render={props => (
                               <UserHolidayPage authenticatedUser={this.props.authenticatedUser} match={props.match}/>
                           )}/>
                    <Route path={"/shared-agenda/:userId"} exct={true}
                           render={props => (
                               <SharedAgendaOverviewPage match={props.match} menuOpen={this.state.open}/>
                           )}/>
                </Switch>
            );
        } else if (this.props.authenticatedUser.authority === "ADMIN" || this.props.authenticatedUser.authority === "SECRETARY") {
            return (
                <Switch>
                    <Route path={"/"} exact={true}
                           render={props => (
                               <Home authenticatedUser={this.props.authenticatedUser} match={props.match}
                                     menuOpen={this.state.open}/>
                           )}/>
                    <Route path={"/agenda/:userId?"} exact={true}
                           render={props => (
                               <AgendaOverview history={props.history} match={props.match} menuOpen={this.state.open}/>
                           )}/>
                    <Route path={"/share"} exact={true}
                           render={props => (
                               <SharePage authenticatedUser={this.props.authenticatedUser}/>
                           )}/>
                    <Route path={"/holiday/:year?"} exact={true}
                           render={props => (
                               <UserHolidayPage authenticatedUser={this.props.authenticatedUser} match={props.match}/>
                           )}/>
                    <Route path={"/manage-holidays/:userId?/:year?"} exact={true}
                           render={props => (
                               <ManageHolidayPage match={props.match}/>
                           )}/>
                    <Route path={"/project-overview"} exact={true}
                           render={props => (
                               <ProjectOverviewPage match={props.match}/>
                           )}/>
                    <Route path={"/overview-of-work-schedules"} exact={true}
                           render={props => (
                               <OverviewOfWorkSchedulesPage match={props.match}/>
                           )}/>
                    <Route path={"/accounts"} exact={true}
                           render={props => (
                               <UserManagementPage match={props.match}/>
                           )}/>
                    <Route path={"/shared-agenda/:userId"} exct={true}
                           render={props => (
                               <SharedAgendaOverviewPage match={props.match} menuOpen={this.state.open}/>
                           )}/>
                </Switch>
            );
        } else {
            return null;
        }
    }

    render() {
        const {classes, theme} = this.props;

        let notificationLength = 0;

        if(this.state.notifications){
            notificationLength = this.state.notifications.filter(value => value.shown === false).length;
        }

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
                        {(this.props.authenticatedUser.authority === "ADMIN" || this.props.authenticatedUser.authority === "SECRETARY") ?
                            <Tooltip title={"Zobrazit notifikace"}>
                                <IconButton color="inherit"
                                            className={classes.notifiButton}
                                            buttonRef={node => {
                                                this.notificationButtonRef = node;
                                            }}
                                            onClick={this.onNotificationPopoverOpen}>
                                    {this.state.notifications && notificationLength > 0 ?
                                        <Badge color="secondary" badgeContent={notificationLength}>
                                            <Notifications/>
                                        </Badge> :
                                        <Notifications/>}
                                </IconButton>
                            </Tooltip> : null}
                        <Tooltip title={"Odhlásit"}>
                            <IconButton
                                color={"inherit"}
                                aria-label={"Odhlásit"}
                                onClick={this.props.onLogout}
                                className={classNames(classes.exitToAppButton)}
                            >
                                <ExitToApp/>
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
                {(this.props.authenticatedUser.authority === "ADMIN" || this.props.authenticatedUser.authority === "SECRETARY") ?
                    <NotificationPopover open={this.state.notificationPopoverOpen}
                                         buttonRef={this.notificationButtonRef}
                                         onClose={this.onNotificationPopoverClose}
                                         onNotificationUpdate={this.onNotificationUpdate}
                                         notifications={this.state.notifications}/> : null}
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
                        {(this.props.authenticatedUser.authority === "ADMIN" || this.props.authenticatedUser.authority === "SECRETARY") ? secretaryMenuItems(classes) : userMenuItems(classes)}
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
                        <List>{(this.props.authenticatedUser.authority === "ADMIN" || this.props.authenticatedUser.authority === "SECRETARY") ? secretaryMenuItems(classes) : userMenuItems(classes)}</List>
                    </Drawer>
                </Hidden>
                {this._routeSwitch()}
            </div>
        );
    }
}

SPAAuthenticated.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
    onLogout: PropTypes.func.isRequired,
    authenticatedUser: PropTypes.instanceOf(User)
};

export default withStyles(Styles, {withTheme: true})(SPAAuthenticated);