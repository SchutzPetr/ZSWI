import React from "react";
import PropTypes from "prop-types";

import Styles from "./style/LoginStyle"
import classNames from 'classnames';
import {withStyles} from "@material-ui/core/styles/index";
import {
    Button,
    FormControl,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    FormHelperText,
    FormControlLabel,
    Switch
} from "@material-ui/core/index";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NavigateNext from "@material-ui/icons/NavigateNext";

class Login extends React.Component {

    state = {
        login: "",
        password: "",
        showPassword: false,
        savePassword: false,
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
        this.props.onLogin({login: this.state.login, password: this.state.password}, this.state.savePassword, event);
    };

    render() {
        const {classes} = this.props;
        return (
            <Paper className={classes.root}>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="adornment-login">Login</InputLabel>
                    <Input
                        id="adornment-login"
                        type={'text'}
                        value={this.state.login}
                        onChange={this.handleChange('login')}
                        endAdornment={
                            <InputAdornment position="end">
                                <AccountCircle className={classes.userIcon}/>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="adornment-password">Password</InputLabel>
                    <Input
                        id="adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl className={classes.rememberSwitchWrapper} component={"div"}>
                    <FormHelperText className={classes.rememberSwitchLabel}>{"Zapamatovat přihlášení"}</FormHelperText>
                    <FormControlLabel
                        className={classes.rememberSwitch}
                        control={
                            <Switch
                                checked={this.state.savePassword}
                                onChange={(event) => {
                                    this.setState({savePassword: event.target.checked})
                                }}
                                value={"savePassword"}
                            />
                        }
                        label={this.state.savePassword ? "Zapamatované" : "Nezapamatované"}
                    />
                </FormControl>
                <Button className={classes.loginButton} variant="raised" color="primary" onClick={this.handleLogin}>
                    Login
                    <NavigateNext/>
                </Button>
            </Paper>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired
};

export default withStyles(Styles, {withTheme: true})(Login);