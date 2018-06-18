import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/UserDetailStyle";
import {Card, CardContent, CardHeader, Typography, Button} from "@material-ui/core/index";
import User from "../../entity/User";
import Authentication from "./../../Authentication";
import SimpleUser from "../../entity/SimpleUser";
import Config from "./../../Config";
import SharedVariable from "./../../SharedVariable";
import Calls from "../../Calls";

class UserDetail extends React.Component {

    render() {
        let user = this.props.user;

        if (!user) {
            return (<Card className={this.props.classes.empty}/>)
        }

        return (
            <Card>
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
                                            month: SharedVariable.TIMESHEAT_MONTH,
                                            year: SharedVariable.TIMESHEAT_YEAR,
                                            users: [user.id]
                                        },
                                        done: (data) => {
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
    mode: PropTypes.string
};

UserDetail.defaultProps = {
    user: Authentication.user,
    mode: "USER",
};

export default withStyles(Styles, {withTheme: true})(UserDetail);