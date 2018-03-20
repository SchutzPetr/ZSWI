// This file is shared across the demos.

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import StarIcon from 'material-ui-icons/Star';
import SendIcon from 'material-ui-icons/Send';
import MailIcon from 'material-ui-icons/Mail';
import DeleteIcon from 'material-ui-icons/Delete';
import ReportIcon from 'material-ui-icons/Report';

export const mailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Starred" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Send mail" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
        </ListItem>
    </div>
);

export const otherMailFolderListItems = (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All mail" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Spam" />
        </ListItem>
    </div>
);

export const userData = [{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"},{"givenName":"Petr","familyName":"Schutz","email":"schutzp@students.zcu.cz"}];

export const events = [
    {
        date: new Date(2018, 1, 25),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 1, 25, 8, 0, 0),
                end: new Date(2018, 1, 25, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 1, 25, 12, 30, 0),
                end: new Date(2018, 1, 25, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
    {
        date: new Date(2018, 2, 1),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 1, 8, 0, 0),
                end: new Date(2018, 2, 1, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 1, 12, 30, 0),
                end: new Date(2018, 2, 1, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
    {
        date: new Date(2018, 2, 12),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 12, 8, 0, 0),
                end: new Date(2018, 2, 12, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 12, 12, 30, 0),
                end: new Date(2018, 2, 12, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
    {
        date: new Date(2018, 2, 13),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 13, 8, 0, 0),
                end: new Date(2018, 2, 13, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 13, 12, 30, 0),
                end: new Date(2018, 2, 13, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
    {
        date: new Date(2018, 2, 14),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 14, 8, 0, 0),
                end: new Date(2018, 2, 14, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 14, 12, 30, 0),
                end: new Date(2018, 2, 14, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
    {
        date: new Date(2018, 2, 15),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 15, 8, 0, 0),
                end: new Date(2018, 2, 15, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 15, 12, 30, 0),
                end: new Date(2018, 2, 15, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
    {
        date: new Date(2018, 2, 16),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 16, 8, 0, 0),
                end: new Date(2018, 2, 16, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 16, 12, 30, 0),
                end: new Date(2018, 2, 16, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
    {
        date: new Date(2018, 2, 17),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 17, 8, 0, 0),
                end: new Date(2018, 2, 17, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 17, 12, 30, 0),
                end: new Date(2018, 2, 17, 16, 30, 0),
                description: "AFTERNOON",
                bgColor: '#dc143c',
            }
        ]
    },
];


export const events2 = [
    {
        title: "EVENT",
        start: new Date(2018, 1, 25, 8, 0, 0),
        end: new Date(2018, 1, 25, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 1, 25, 12, 30, 0),
        end: new Date(2018, 1, 25, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 1, 8, 0, 0),
        end: new Date(2018, 2, 1, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 1, 12, 30, 0),
        end: new Date(2018, 2, 1, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 12, 8, 0, 0),
        end: new Date(2018, 2, 12, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 12, 12, 30, 0),
        end: new Date(2018, 2, 12, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 13, 8, 0, 0),
        end: new Date(2018, 2, 13, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 13, 12, 30, 0),
        end: new Date(2018, 2, 13, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 14, 8, 0, 0),
        end: new Date(2018, 2, 14, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 14, 12, 30, 0),
        end: new Date(2018, 2, 14, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 15, 8, 0, 0),
        end: new Date(2018, 2, 15, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 15, 12, 30, 0),
        end: new Date(2018, 2, 15, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 16, 8, 0, 0),
        end: new Date(2018, 2, 16, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 16, 12, 30, 0),
        end: new Date(2018, 2, 16, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 17, 8, 0, 0),
        end: new Date(2018, 2, 17, 12, 0, 0),
        description: "MORNING",
        bgColor: '#dc143c',
    },
    {
        title: "EVENT",
        start: new Date(2018, 2, 17, 12, 30, 0),
        end: new Date(2018, 2, 17, 16, 30, 0),
        description: "AFTERNOON",
        bgColor: '#dc143c',
    }
];

export const ee = [
    {
        'title': 'All Day Event very long title',
        'bgColor': '#ff7f50',
        'allDay': true,
        'start': new Date(2015, 3, 0),
        'end': new Date(2015, 3, 1)
    },
    {
        'title': 'Long Event',
        'start': new Date(2015, 3, 7),
        'end': new Date(2015, 3, 10)
    },

    {
        'title': 'DTS STARTS',
        'bgColor': '#dc143c',
        'start': new Date(2016, 2, 13, 0, 0, 0),
        'end': new Date(2016, 2, 20, 0, 0, 0)
    },

    {
        'title': 'DTS ENDS',
        'bgColor': '#ff8c00',
        'start': new Date(2016, 10, 6, 0, 0, 0),
        'end': new Date(2016, 10, 13, 0, 0, 0)
    },

    {
        'title': 'Some Event',
        'bgColor': '#9932cc',
        'start': new Date(2015, 3, 9, 0, 0, 0),
        'end': new Date(2015, 3, 9, 0, 0, 0)
    },
    {
        'title': 'Conference',
        'bgColor': '#e9967a',
        'start': new Date(2015, 3, 11),
        'end': new Date(2015, 3, 13),
        desc: 'Big conference for important people'
    },
    {
        'title': 'Meeting',
        'bgColor': '#8fbc8f',
        'start': new Date(2015, 3, 12, 10, 30, 0, 0),
        'end': new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'bgColor': '#cd5c5c',
        'start':new Date(2015, 3, 12, 12, 0, 0, 0),
        'end': new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        'title': 'Happy Hour',
        'start':new Date(2015, 3, 12, 12, 0, 0, 0),
        'end': new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch happy hour'
    },
    {
        'title': 'Meeting',
        'bgColor': '#da70d6',
        'start':new Date(2015, 3, 12,14, 0, 0, 0),
        'end': new Date(2015, 3, 12,15, 0, 0, 0)
    },
    {
        'title': 'Happy Hour',
        'bgColor': '#eee8aa',
        'start':new Date(2015, 3, 17, 17, 0, 0, 0),
        'end': new Date(2015, 3, 17, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },
    {
        'title': 'Dinner',
        'bgColor': '#98fb98',
        'start':new Date(2015, 3, 15, 20, 0, 0, 0),
        'end': new Date(2015, 3, 15, 21, 0, 0, 0)
    },
    {
        'title': 'Birthday Party',
        'bgColor': '#afeeee',
        'start':new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 2',
        'bgColor': '#db7093',
        'start':new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 3',
        'bgColor': '#cd853f',
        'start':new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Late Night Event',
        'bgColor': '#b0e0e6',
        'start':new Date(2015, 3, 17, 19, 30, 0),
        'end': new Date(2015, 3, 18, 2, 0, 0)
    },
    {
        'title': 'Multi-day Event',
        'start':new Date(2015, 3, 20, 19, 30, 0),
        'end': new Date(2015, 3, 22, 2, 0, 0)
    }
]