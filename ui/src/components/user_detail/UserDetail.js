import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Styles from "./style/UserDetailStyle";
import LinearProgress from "material-ui/es/Progress/LinearProgress";
import {Typography, Paper, CardContent, Card, CardHeader} from "material-ui";

class UserDetail extends React.Component {

    render() {
        return (
            <Card>
                <CardHeader title="Petr Schutz"/>
                <CardContent>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Pracovní umístění:</Typography>
                        <Typography variant={"body1"}>NTIS</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Typ pracovního úvazků:</Typography>
                        <Typography variant={"body1"}>0,7</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Počet dnů dovolené:</Typography>
                        <Typography variant={"body1"}>40h</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Vyčerpaná dovolená:</Typography>
                        <Typography variant={"body1"}>4h</Typography>
                    </div>
                    <div className={this.props.classes.row}>
                        <Typography variant={"body2"}>Pracovní umístění:</Typography>
                        <Typography variant={"body1"}>NTIS</Typography>
                    </div>
                </CardContent>
            </Card>
        )
    }
}

UserDetail.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool
};

export default withStyles(Styles, {withTheme: true})(UserDetail);