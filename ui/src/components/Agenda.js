import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import moment from "moment";


const styles = theme => ({
    root: {
        maxHeight: `calc(100vh - 112px)`,
        height: `calc(100vh - 112px)`,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

const events = [
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
        date: new Date(2018, 2, 2),
        events: [
            {
                title: "EVENT",
                start: new Date(2018, 2, 2, 8, 0, 0),
                end: new Date(2018, 2, 2, 12, 0, 0),
                description: "MORNING",
                bgColor: '#dc143c',
            },
            {
                title: "EVENT",
                start: new Date(2018, 2, 2, 12, 30, 0),
                end: new Date(2018, 2, 2, 16, 30, 0),
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


class Agenda extends React.Component {


    prepare(data = []) {
        let result = [];

        data.map((item, index) => {
            item.events.map((event, index) => {
                if (index === 0) {
                    result.push(
                        <TableRow key={`${index}-${item.date}`}>
                            <TableCell rowSpan={item.events.length}>{moment(item.date).format("LL")}</TableCell>
                            <TableCell>{moment(event.start).format("H:mm")}</TableCell>
                            <TableCell>{moment(event.end).format("H:mm")}</TableCell>
                            <TableCell>{event.description}</TableCell>
                        </TableRow>
                    );
                }else{
                    result.push(
                        <TableRow key={`${index}-${item.date}`}>
                            <TableCell>{moment(event.start).format("H:mm")}</TableCell>
                            <TableCell>{moment(event.end).format("H:mm")}</TableCell>
                            <TableCell>{event.description}</TableCell>
                        </TableRow>
                    );
                }
            });
        });

        return result;
    }

    render() {
        const {classes} = this.props;

        let xx = this.prepare(events);

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Od</TableCell>
                            <TableCell>Do</TableCell>
                            <TableCell>Typ</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.prepare(events)}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

Agenda.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Agenda);