import React from "react";
import PropTypes from "prop-types";

import Styles from "./style/ProjectOverviewStyle"
import {withStyles} from "material-ui/styles/index";
import {Paper} from "material-ui";

class ProjectOverview extends React.Component {

    state = {
        login: "",
        password: "",
        showPassword: false,
    };

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleMouseDownPassword = event => {
        event.preventDefault();
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleLogin = event => {
        this.props.onLogin({login: this.state.login, password: this.state.password}, event);
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>

            </Paper>
        );
    }
}

ProjectOverview.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired
};

export default withStyles(Styles, {withTheme: true})(ProjectOverview);