import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import moment from "moment";
import {Paper, Tab, Tabs} from "material-ui";
import Agenda from "./Agenda";


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    tab: {
        width: "8.3%",
        minWidth: "8.3%"
    }
});

class AgendaTabs extends React.Component {

    state = {
        year: 2018,
        month: new Date().getMonth(),
    };

    changeMonth(event, value) {
        this.setState({
            month: value
        });
    }


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
                <Tabs value={this.state.month}
                      onChange={this.changeMonth.bind(this)}
                      scrollable={false}
                      indicatorColor={"primary"}
                      textColor={"primary"}>
                    {months.map((value, index) => {
                        return <Tab className={classes.tab} label={moment(value).format("MMMM")}/>
                    })}
                </Tabs>
            </Paper>
        );
    }
}

AgendaTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AgendaTabs);