import React from "react";
import "./index.css";
import Authentication from "./Authentication";
import Config from "./Config";
import SPAAuthenticated from "./spa/SPAAuthenticated";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles/index";
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import axios from 'axios';
import SPANotAuthenticated from "./spa/SPANotAuthenticated";
import {Route} from "react-router-dom";
import Calls from "./Calls";
import User from "./entity/User";
import LinearProgressCentered from "./components/LinearProgressCentered";
import PropTypes from "prop-types";

const theme = createMuiTheme();

class App extends React.Component {

    constructor(props) {
        super(props);

        moment.locale('cs');

        axios.defaults.headers.post["Content-Type"] = "application/json";
        axios.defaults.baseURL = props.config.API_URL;

        Config.API_URL = props.config.API_URL;
        Config.VERSION = props.config.VERSION;
        Config.APP_DIRECTORY = props.config.APP_DIRECTORY;

        this.state = {
            config: props.config,
            authenticatedUser: null,
            token: !!Authentication.getToken()
        };
    }

    componentDidMount() {
        const token = Authentication.getSessionToken();
        this.authUserByToken(token ? token : Authentication.getToken());
    }

    onLoginDone(data, savePasswords) {
        if (!data.token) {
            return;
        }
        Authentication.saveSessionToken(data.token);
        this.authUserByToken(data.token, savePasswords);
    }

    onLogout() {
        Authentication.user = null;
        Authentication.clearToken();
        this.setState({authenticatedUser: null});
    }

    authUserByToken(token, savePasswords = false) {
        if (!token) {
            return;
        }
        axios.defaults.headers.common["X-Auth-Token"] = token;
        Calls.authUserByToken({
            data: {token: token},
            done: (userData) => {
                this.setState((prevState) => {

                    const user = User.map(userData.data);
                    Authentication.user = user;
                    if (savePasswords) {
                        Authentication.saveToken(token);
                    }

                    return {
                        authenticatedUser: user,
                    }
                });
            },
            fail: (userData) => {
                Authentication.clearToken();
                this.setState({authenticatedUser: null, token: !!Authentication.getToken()});
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider
                    utils={MomentUtils}
                    moment={moment}
                    locale={"cs"}
                >
                    <Route path={"*"} exact={true}
                           render={props => {
                               if (!this.state.config || (this.state.token && this.state.authenticatedUser === null)) {
                                   return <LinearProgressCentered fullPage={true}/>;
                               } else {
                                   if (Authentication.isAuthenticated()) {
                                       return <SPAAuthenticated authenticatedUser={this.state.authenticatedUser}
                                                                match={props.match} history={props.history}
                                                                onLogout={this.onLogout.bind(this)}/>
                                   } else {
                                       return <SPANotAuthenticated authenticatedUser={this.state.user}
                                                                   match={props.match}
                                                                   history={props.history}
                                                                   onLoginDone={this.onLoginDone.bind(this)}/>
                                   }
                               }
                           }}/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

SPAAuthenticated.propTypes = {
    config: PropTypes.object.isRequired,
};

export default App;
