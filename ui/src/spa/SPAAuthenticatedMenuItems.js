// This file is shared across the demos.

import React from "react";
import {ListItem, ListItemIcon, ListItemText, Divider} from "@material-ui/core/index";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
import Home from "@material-ui/icons/Home";
import {Link} from "react-router-dom";
import ViewAgenda from "@material-ui/icons/ViewAgenda";
import Share from "@material-ui/icons/Share";
import EventBusy from "@material-ui/icons/EventBusy";
import Settings from "@material-ui/icons/Settings";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Work from "@material-ui/icons/Work";


export let secretaryMenuItems = (classes) => {
    return (<div>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/"}>
                <ListItemIcon>
                    <Home/>
                </ListItemIcon>
                <ListItemText primary={"Domů"}/>
            </ListItem>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/share"}>
                <ListItemIcon>
                    <Share/>
                </ListItemIcon>
                <ListItemText primary={"Sdílet"}/>
            </ListItem>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/holiday"}>
                <ListItemIcon>
                    <EventBusy/>
                </ListItemIcon>
                <ListItemText primary={"Dovolená"}/>
            </ListItem>
            <Divider/>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/agenda"}>
                <ListItemIcon>
                    <ViewAgenda/>
                </ListItemIcon>
                <ListItemText primary="Výkazy"/>
            </ListItem>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/manage-holidays"}>
                <ListItemIcon>
                    <EventBusy/>
                </ListItemIcon>
                <ListItemText primary="Správa dovolené"/>
            </ListItem>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/project-overview"}>
                <ListItemIcon>
                    <Work/>
                </ListItemIcon>
                <ListItemText primary="Správa projektů"/>
            </ListItem>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/overview-of-work-schedules"}>
                <ListItemIcon>
                    <ViewAgenda/>
                </ListItemIcon>
                <ListItemText primary="Přehled úvazků"/>
            </ListItem>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/accounts"}>
                <ListItemIcon>
                    <SupervisorAccount/>
                </ListItemIcon>
                <ListItemText primary="Správa uživatelů"/>
            </ListItem>
            <ListItem className={classes.listItem} button={true} component={Link} to={"/settings"}>
                <ListItemIcon>
                    <Settings/>
                </ListItemIcon>
                <ListItemText primary="Nastavení"/>
            </ListItem>
        </div>
    )
};
export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon/>
            </ListItemIcon>
            <ListItemText primary="All mail"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon/>
            </ListItemIcon>
            <ListItemText primary="Trash"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon/>
            </ListItemIcon>
            <ListItemText primary="Spam"/>
        </ListItem>
    </div>
);
