import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import classNames from 'classnames';

import MenuIcon from 'material-ui-icons/Menu';
import moment from 'moment'
import BigCalendar from 'react-big-calendar-like-google';
import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import {mailFolderListItems, otherMailFolderListItems, userData, events} from './tileData';
import {
    AppBar, Avatar, Divider, Drawer, Grid, Hidden, IconButton, List, ListItem, ListItemText, Paper, Toolbar,
    Typography
} from "material-ui";
import {Route} from "react-router-dom";
import ContentAuthenticated from "../authenticated/content/ContentAuthenticated";

import ImageIcon from 'material-ui-icons/Image';
import WorkIcon from 'material-ui-icons/Work';
import BeachAccessIcon from 'material-ui-icons/BeachAccess';
import User from "../entity/User";
import UserList from "../components/UserList";
import Agenda from "../components/Agenda";

const drawerWidth = 240;

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        maxHeight: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperMobile: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        position: 'relative',
        top: 64,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    calendar: {
        height: `calc(100vh - 112px)`,
        maxHeight: `calc(100vh - 112px)`,
    }
});

class Layout extends React.Component {
    state = {
        open: false,
    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, theme} = this.props;

        let xx = userData;

        let users = [];

        xx.map((value) => {
            users.push(User.map(value));
        });

        let date = moment();


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
                        <Typography variant="title" color="inherit" noWrap>
                            Mini variant drawer
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={this.state.open}
                        onClose={this.handleDrawerClose}
                        classes={{
                            paper: classes.drawerPaperMobile,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {mailFolderListItems}
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
                        <List>{mailFolderListItems}</List>
                        <Divider/>
                        <List>{otherMailFolderListItems}</List>
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={4}>
                            <UserList match={{ahoj: "s"}} users={users}/>
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <Agenda/>
                        </Grid>
                    </Grid>
                </main>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Layout);