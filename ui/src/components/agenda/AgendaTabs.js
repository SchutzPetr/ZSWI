import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import moment from "moment";
import {Button, LinearProgress, Paper, Tab, Tabs} from "material-ui";
import Agenda from "./Agenda";
import Utils from "../../other/Utils";
import TimeSheet from "../../entity/TimeSheet";
import UserTimeSheets from "../../entity/UserTimeSheets";


const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        width: "90%",
        height: 35,
        minHeight: 35
    },
    tab: {
        width: "8.333333333333333%",
        minWidth: "8.333333333333333%",
        maxWidth: "8.333333333333333%",
        height: 35
    },
    yearButton: {
        width: "5%",
        minWidth: "5%",
        maxWidth: "5%",
    },
    indicator: {
        height: 3
    },
    loadingPaper: {
        maxHeight: "calc(100vh - 115px)",
        height: "calc(100vh - 115px)",

    },
    loading: {
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        width: "80%"
    },
    bottom:{
        display: "flex"
    }
});

class AgendaTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userTimeSheets: new UserTimeSheets(props.user),
            year: 2018,
            month: new Date().getMonth(),
        }
    }

    componentDidMount() {
        this.loadTimeSheet(this.state.month, this.state.year);
    }

    changeMonth(event, value) {
        this.setState({
            month: value - 1
        }, () => {
            this.loadTimeSheet(value - 1, this.state.year)
        });
    }

    handleChangeYear = year => event => {
        this.setState({
            year: year
        }, () => {
            this.loadTimeSheet(this.state.month, year)
        });
    };

    loadTimeSheet(month, year) {
        setTimeout(() => {
            this.setState(prevState => {
                let userTimeSheets = prevState.userTimeSheets;
                userTimeSheets.putTimeSheet(Utils.generateMockData(month, year, false));

                return {
                    userTimeSheets: userTimeSheets
                }

            });
        }, 1000);
    }

    handleTimeSheetEdit(dayTimeSheetEdited) {
        this.setState(prevState => {
            let userTimeSheets = prevState.userTimeSheets;
            userTimeSheets.getTimeSheet(prevState.month).dayTimeSheets[dayTimeSheetEdited.date.getDate().toString()] = dayTimeSheetEdited;

            return {
                userTimeSheets: userTimeSheets
            }

        });
    };

    changeNTIS(){

    }

    _wrapIsNTIS(timeSheet, data){
        const {classes} = this.props;

        if(timeSheet != null && timeSheet.isNTIS){
            return (
                <Tabs classes={{root: classes.tabs, indicator: classes.indicator}}
                      value={this.state.month + 1}
                      onChange={this.changeNTIS.bind(this)}
                      scrollable={false}
                      indicatorColor={"primary"}>
                    <Tab key={"TAB-FAV"} className={classes.tab} label={"FAV"}/>
                    <Tab key={"TAB-NTIS"} className={classes.tab} label={"NTIS"}/>
                </Tabs>
            )
        }else{

        }
    }

    render() {
        const {classes} = this.props;

        let months = [];

        for (let i = 0; i < 12; i++) {
            months.push(new Date(this.state.year, i));
        }

        console.log(JSON.stringify(this.state.userTimeSheets));

        let timeSheet = this.state.userTimeSheets.getTimeSheet(this.state.month);

//                {timeSheet == null ? <Paper className={classes.loading}><LinearProgress/></Paper> : <Agenda timeSheet={timeSheet} onTimeSheetEdit={this.handleTimeSheetEdit.bind(this)}/>}
        return (
            <Paper className={classes.root}>
                {timeSheet != null && timeSheet.isNTIS ?
                    <Tabs classes={{root: classes.tabs, indicator: classes.indicator}}
                                                               value={this.state.month + 1}
                                                               onChange={this.changeNTIS.bind(this)}
                                                               scrollable={false}
                                                               indicatorColor={"primary"}>
                    <Tab className={classes.tab} label={"FAV"}/>
                    <Tab className={classes.tab} label={"NTIS"}/>
                </Tabs> : null}
                {timeSheet == null ?
                    <Paper className={classes.loadingPaper}><LinearProgress className={classes.loading}/></Paper> :
                    <Agenda timeSheet={timeSheet} onTimeSheetEdit={this.handleTimeSheetEdit.bind(this)}/>}
                <div className={classes.bottom}>
                    <Button className={classes.yearButton}
                            disabled={timeSheet == null}
                            onClick={this.handleChangeYear(this.state.year - 1)}>{this.state.year - 1}</Button>
                    <Tabs classes={{root: classes.tabs, indicator: classes.indicator}}
                          value={this.state.month + 1}
                          onChange={this.changeMonth.bind(this)}
                          scrollable={false}
                          indicatorColor={"primary"}>
                        {months.map((value, index) => {
                            return <Tab key={`TAB-Agenda-${moment(value).format("MMMM")}`}
                                        className={classes.tab}
                                        disabled={timeSheet == null}
                                        label={moment(value).format("MMMM")}/>
                        })}
                    </Tabs>
                    <Button className={classes.yearButton}
                            disabled={timeSheet == null}
                            onClick={this.handleChangeYear(this.state.year + 1)}>{this.state.year + 1}</Button>
                </div>
            </Paper>
        );
    }
}

AgendaTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(AgendaTabs);