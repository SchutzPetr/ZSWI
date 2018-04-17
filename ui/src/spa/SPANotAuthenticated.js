import React from "react";
import PropTypes from "prop-types";

import Styles from "./style/SPANotAuthenticatedStyle"
import {withStyles} from "material-ui/styles/index";
import {AppBar, Button, Toolbar, Typography} from "material-ui";
import {Link, Route} from "react-router-dom";
import LoginPage from "../use_cases/uc_login/LoginPage";

class SPANotAuthenticated extends React.Component {

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
                <main className={classes.content}>
                    <Route path={"/login"} exact={true}
                           render={props => (
                               <LoginPage match={props.match} history={props.history}/>
                           )}/>
                </main>
            </div>
        );
    }
}

SPANotAuthenticated.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(Styles, {withTheme: true})(SPANotAuthenticated);