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

class UserDetail extends React.Component {

    render() {
        let user = this.props.user;

        if (!user) {
            return (
                <Card className={this.props.mode === "USER" ? this.props.classes.emptyU : this.props.classes.empty}/>)
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
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Počet dnů dovolené:</Typography>
                        <Typography variant={"body1"}>{user.mainWorkStation}</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Vyčerpaná dovolená:</Typography>
                        <Typography variant={"body1"}>4h</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Zbývá dovolené:</Typography>
                        <Typography variant={"body1"}>NTIS</Typography>
                    </div>
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