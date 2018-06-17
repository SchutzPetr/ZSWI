import React from "react";
import PropTypes from "prop-types";

import Styles from "./style/SPANotAuthenticatedStyle"
import {withStyles} from "@material-ui/core/styles/index";
import {Link, Route, Switch} from "react-router-dom";
import LoginPage from "../use_cases/uc_login/LoginPage";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core/index";


class SPANotAuthenticated extends React.Component {

    componentDidMount(){
        this.props.history.push("/");
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            Docházkový systém
                        </Typography>
                        <Route path={"/"} exact={true}
                               render={props => (
                                   <Button component={Link} to={"/login"} color="inherit">Login</Button>
                               )}/>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route path={"/login"} exact={true}
                           render={props => (
                               <LoginPage match={props.match} history={props.history} onLoginDone={this.props.onLoginDone}/>
                           )}/>
                </Switch>
            </div>
        );
    }
}

SPANotAuthenticated.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    match: PropTypes.any.isRequired,
    history: PropTypes.any.isRequired,
    onLoginDone: PropTypes.func.isRequired
};

export default withStyles(Styles, {withTheme: true})(SPANotAuthenticated);