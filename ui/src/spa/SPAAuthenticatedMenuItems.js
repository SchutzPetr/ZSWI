// This file is shared across the demos.

import React from "react";
import {ListItem, ListItemIcon, ListItemText} from "material-ui/List";
import InboxIcon from "material-ui-icons/MoveToInbox";
import DraftsIcon from "material-ui-icons/Drafts";
import StarIcon from "material-ui-icons/Star";
import SendIcon from "material-ui-icons/Send";
import MailIcon from "material-ui-icons/Mail";
import DeleteIcon from "material-ui-icons/Delete";
import ReportIcon from "material-ui-icons/Report";
import Home from "material-ui-icons/es/Home";
import {Link} from "react-router-dom";
import ViewAgenda from "material-ui-icons/es/ViewAgenda";
import Divider from "material-ui/es/Divider/Divider";
import Share from "material-ui-icons/es/Share";
import EventBusy from "material-ui-icons/es/EventBusy";
import Settings from "material-ui-icons/es/Settings";


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
            <ListItem className={classes.listItem} button={true}>
                <ListItemIcon>
                    <EventBusy/>
                </ListItemIcon>
                <ListItemText primary="Správa dovolené"/>
            </ListItem>
            <ListItem className={classes.listItem} button={true}>
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
