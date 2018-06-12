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

class AgendaTabs extends React.Component {

    constructor(props) {
        super(props);

        this.state = AgendaTabs.getDerivedStateFromProps(props);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            userTimeSheets: new UserTimeSheets(nextProps.user),
            year: 2018,
            month: new Date().getMonth(),
        };
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
       /* Calls.getUserTimeSheet({
            data: {userId: this.props.user.id, month: month, year: year},
            done: (data) => {
                this.setState({users: User.map(data.data), loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });*/
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
    user: PropTypes.instanceOf(User).isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

export default withStyles(Style, {withTheme: true})(AgendaTabs);