import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import moment from "moment";
import {Button, Paper, Tab, Tabs} from "material-ui";
import Agenda from "./Agenda";


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        height: 35,
        minHeight: 35
    },
    tab: {
        width: "7.5%",
        minWidth: "7.5%",
        maxWidth: "7.5%",
        height: 35
    },
    yearButton: {
        width: "5%",
        minWidth: "5%",
        maxWidth: "5%",
    }
});

class AgendaTabs extends React.Component {

    state = {
        year: 2018,
        month: new Date().getMonth(),
    };

    changeMonth(event, value) {
        this.setState({
            month: value - 1
        });
    }

    changeYear(year) {
        debugger
        this.setState({
            year: year
        });
    }

    handleChangeYear = year => event => {
        this.setState({
            year: year
        });
    };

    render() {
        const {classes} = this.props;

        let months = [];

        for (let i = 0; i < 12; i++) {
            months.push(new Date(this.state.year, i));
        }

        //return (<Paper className={classes.root}/>)

        return (
            <Paper className={classes.root}>
                {this.state.month === 0 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 1 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 2 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 3 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 4 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 5 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 6 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 7 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 8 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 9 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 10 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                {this.state.month === 11 && <Agenda date={new Date(this.state.year, this.state.month)}/>}
                <Tabs className={classes.tabs}
                      value={this.state.month + 1}
                      onChange={this.changeMonth.bind(this)}
                      scrollable={false}
                      indicatorColor={"primary"}>
                    <Button className={classes.yearButton}
                            onClick={this.handleChangeYear(this.state.year - 1)}>{this.state.year - 1}</Button>
                    {months.map((value, index) => {
                        return <Tab className={classes.tab} label={moment(value).format("MMMM")}/>
                    })}
                    <Button className={classes.yearButton}
                            onClick={this.handleChangeYear(this.state.year + 1)}>{this.state.year + 1}</Button>
                </Tabs>
            </Paper>
        );
    }
}

AgendaTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgendaTabs);