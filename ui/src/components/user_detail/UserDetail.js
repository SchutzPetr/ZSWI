import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/UserDetailStyle";
import {Button, Card, CardContent, CardHeader, Typography} from "@material-ui/core/index";
import User from "../../entity/User";
import Authentication from "./../../Authentication";
import SimpleUser from "../../entity/SimpleUser";
import SharedVariable from "./../../SharedVariable";
import Calls from "../../Calls";
import moment from "moment";
import HolidayRowRecord from "../../entity/HolidayRowRecord";

class UserDetail extends React.Component {


    constructor(props) {
        super(props);

        this.state = {userHolidays: []};
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!(this.props.user && nextProps.user && this.props.user.id === nextProps.user.id)) {
            this._fetch(nextProps.user);
        }

        return true;
    }

    componentDidMount() {
        this._fetch(this.props.user);
    }


    _fetch(user) {
        if (!user || !this.canRenderHolidayContent()) {
            return;
        }
        Calls.getUserHolidayByUserIdAndYear({
            data: {userId: user.id, year: new Date().getFullYear()}, //todo: year
            done: (data) => {
                this.setState({userHolidays: HolidayRowRecord.map(data.data), loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    getHolidayDays() {
        let holiday = this.props.user.userHolidaySettings.find(value => value.year === new Date().getFullYear());
        if (!holiday) {
            return 0;
        } else {
            return holiday.days;
        }
    }

    getExhaustedHolidayDays() {
        if (!this.props.user) {
            return 0;
        }
        let x = this.state.userHolidays.map(value => {
            if (value.type === "FIRST_PART_OF_DAY" || value.type === "SECOND_PART_OF_DAY") {
                return 0.5;
            } else if (value.type === "ALL_DAY") {
                return 1;
            }else{
                return 0;
            }
        });

        return x.reduce((a, b) => a + b, 0);
    }

    canRenderHolidayContent(){
        if(this.props.mode === "SECRETARY"){
            return true;
        }else return Authentication.user.id === this.props.user.id;
    }


    render() {
        let user = this.props.user;

        if (!user) {
            return (
                <Card className={this.props.mode === "USER" ? this.props.classes.emptyU : this.props.classes.empty}/>)
        }

        let ava = 0;
        let ex = 0;

        if(this.canRenderHolidayContent()){
            ava = this.getHolidayDays();
            ex = this.getExhaustedHolidayDays();
        }

        return (
            <Card className={this.props.mode === "USER" ? this.props.classes.cardU : this.props.classes.card}>
                <CardHeader title={user.displayFullName}/>
                <CardContent>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Pracovní umístění:</Typography>
                        <Typography variant={"body1"}>{user.mainWorkStation}</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Velikost pracovního úvazků KIV:</Typography>
                        <Typography variant={"body1"}>{user.currentUserContract.obligationKIV}</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Velikost pracovního úvazků NTIS:</Typography>
                        <Typography variant={"body1"}>{user.currentUserContract.obligationNTIS}</Typography>
                    </div>
                    {this.canRenderHolidayContent() ?
                        <div className={this.props.classes.row}>
                            <Typography variant={"body2"}>Počet dnů dovolené:</Typography>
                            <Typography variant={"body1"}>{ava}</Typography>
                        </div> : null
                    }
                    {this.canRenderHolidayContent() ?
                        <div className={this.props.classes.row}>
                            <Typography variant={"body2"}>Vyčerpaná dovolená:</Typography>
                            <Typography variant={"body1"}>{ex}</Typography>
                        </div> : null
                    }
                    {this.canRenderHolidayContent() ?
                        <div className={this.props.classes.row}>
                            <Typography variant={"body2"}>Zbývá dovolené:</Typography>
                            <Typography
                                variant={"body1"}>{ava - ex}</Typography>
                        </div> : null
                    }
                    {this.props.mode === "SECRETARY" || this.props.mode === "ADMIN" ?
                        <Button variant="contained" color="primary"
                                onClick={() => {

                                    Calls.getFileReportExcel({
                                        data: {
                                            month: SharedVariable.TIMESHEAT_MONTH + 1,
                                            year: SharedVariable.TIMESHEAT_YEAR,
                                            users: [user.id]
                                        },
                                        done: (data) => {

                                            let blob = new Blob([data.data], {type: 'application/vnd.ms-excel'});

                                            let downloadUrl = URL.createObjectURL(blob);
                                            let a = document.createElement("a");
                                            a.href = downloadUrl;
                                            a.download = `${user.orionLogin}_${SharedVariable.TIMESHEAT_MONTH}_${SharedVariable.TIMESHEAT_YEAR}_${moment().format("YYYY-MM-DD")}.xls`;
                                            document.body.appendChild(a);
                                            a.click();
                                        },
                                        fail: (data) => {
                                        }
                                    })
                                }}
                                className={this.props.classes.generateButton}>
                            Generuj excel
                        </Button>
                        : null
                    }
                </CardContent>
            </Card>
        )
    }
}

UserDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool,
    user: PropTypes.oneOfType([
        PropTypes.instanceOf(User),
        PropTypes.instanceOf(SimpleUser)
    ]),
    mode: PropTypes.string,
};

UserDetail.defaultProps = {
    user: Authentication.user,
    mode: "USER",
};

export default withStyles(Styles, {withTheme: true})(UserDetail);