import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/UserDetailStyle";
import {Card, CardContent, CardHeader, Typography} from "@material-ui/core/index";
import User from "../../entity/User";
import Authentication from "./../../Authentication";

class UserDetail extends React.Component {

    render() {
        let user = new User();
        //user = this.props.user;
        return (
            <Card>
                <CardHeader title={user.displayFullName}/>
                <CardContent>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Pracovní umístění:</Typography>
                        <Typography variant={"body1"}>{user.mainWorkStation}</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Typ pracovního úvazků:</Typography>
                        <Typography variant={"body1"}>{"TODO"}</Typography>
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
                </CardContent>
            </Card>
        )
    }
}

UserDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool,
    user: PropTypes.instanceOf(User),
};

UserDetail.defaultProps= {
    user: Authentication.user,
};

export default withStyles(Styles, {withTheme: true})(UserDetail);