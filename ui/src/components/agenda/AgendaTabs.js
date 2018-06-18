import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Style from "./style/AgendaTabsStyle";
import moment from "moment";
import {Button, LinearProgress, Paper, Tab, Tabs} from "@material-ui/core/index";
import Agenda from "./Agenda";
import Utils from "../../other/Utils";
import UserTimeSheets from "../../entity/UserTimeSheets";
import User from "../../entity/User";
import Calls from "../../Calls";
import TimeSheet from "../../entity/TimeSheet";
import SimpleUser from "../../entity/SimpleUser";

class AgendaTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            timeSheets: [],
            loadFeedback: "ready",
            year: new Date().getFullYear(),
            month: new Date().getMonth()
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            timeSheets: nextProps.user ? prevState.timeSheets : []
        }
    }


    componentDidMount() {
        this.loadTimeSheet(this.state.month, this.state.year);
    }

    shouldComponentUpdate(newProps, newState, nextContext){
        return true;
    }

    componentDidUpdate(prevProps, prevState, prevContext){
        if(prevProps.user !== this.props.user) {
            this.loadTimeSheet(this.state.month, this.state.year, true);
        }else if(prevProps.user && this.props.user && prevProps.user.id !== this.props.user.id){
            this.loadTimeSheet(this.state.month, this.state.year);
        }
    }

    changeMonth(event, value) {
        this.setState({
            month: value
        }, () => {
            this.loadTimeSheet(value, this.state.year)
        });
    }

    handleChangeYear = year => event => {
        this.setState({
            year: year
        }, () => {
            this.loadTimeSheet(this.state.month, year)
        });
    };

    loadTimeSheet(month, year, clear) {
        if(!this.props.user){
            return;
        }
        if(clear){
            this.setState({loadFeedback: "loading", timeSheets: []});
        }else{
            this.setState({loadFeedback: "loading"});
        }
        Calls.getUserTimeSheet({
            data: {userId: this.props.user.id, month: month + 1, year: year},
            done: (data) => {
                this.setState(prevState =>{
                    let timeSheets = prevState.timeSheets.map(value => Object.assign(new TimeSheet(), value));

                    timeSheets[month] = TimeSheet.map(data.data);

                    return {
                        timeSheets: timeSheets,
                        loadFeedback: "ready"
                    }
                });
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    handleTimeSheetEdit(dayTimeSheetEdited) {
        this.setState({loadFeedback: "loading"});
        Calls.updateDayTimeSheet({
            data: dayTimeSheetEdited,
            done: (data) => {
                this.loadTimeSheet(this.state.month, this.state.year, true)
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
            }
        });
    };

    changeNTIS() {

    }

    _wrapIsNTIS(timeSheet, data) {
        const {classes} = this.props;

        if (timeSheet != null && timeSheet.isNTIS) {
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
        } else {

        }
    }

    _getContend(classes, timeSheet, months) {
        if (this.state.loadFeedback === "loading") {
            return <Paper className={classes.loadingPaper}><LinearProgress className={classes.loading}/></Paper>
        } else if (this.state.loadFeedback === "ready") {
            if(timeSheet == null){
                return  <Paper className={classes.loadingPaper}>EMPTY</Paper>
            }else{
                return <Agenda user={this.props.user} timeSheet={timeSheet} onTimeSheetEdit={this.handleTimeSheetEdit.bind(this)} mode={this.props.mode}/>;
            }
        } else {
            return  <Paper className={classes.loadingPaper}>ERROR</Paper>
        }
    }
    render() {
        const {classes} = this.props;

        let months = [];

        for (let i = 0; i < 12; i++) {
            months.push(new Date(this.state.year, i));
        }

        let timeSheet = this.state.timeSheets[this.state.month];

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
                {this._getContend(classes, timeSheet, months)}
                <div className={classes.bottom}>
                    <Button className={classes.yearButton}
                            disabled={timeSheet == null}
                            onClick={this.handleChangeYear(this.state.year - 1)}>{this.state.year - 1}</Button>
                    <Tabs classes={{root: classes.tabs, indicator: classes.indicator}}
                          value={this.state.month}
                          onChange={this.changeMonth.bind(this)}
                          scrollable={false}
                          indicatorColor={"primary"}>
                        {months.map((value, index) => {
                            return <Tab key={`TAB-Agenda-${moment(value).format("MMMM")}`}
                                        className={classes.tab}
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
    user: PropTypes.oneOfType([
        PropTypes.instanceOf(User),
        PropTypes.instanceOf(SimpleUser)
    ]),
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(User),
    mode: PropTypes.string
};
AgendaTabs.defaultProps = {
    mode: "USER",
};

export default withStyles(Style, {withTheme: true})(AgendaTabs);