import React from "react";
import "./index.css";
import Authentication from "./Authentication";
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

const theme = createMuiTheme();

class App extends React.Component {

    constructor(props) {
        super(props);

        moment.locale('cs');

        fetch('./config.json').then(r => r.json()).then(json => {
            axios.defaults.baseURL = json.API_URL;
        });

        axios.defaults.headers.post["Content-Type"] = "application/json";

        this.state = {
            authenticatedUser: null
        };
    }

    onLoginDone(data) {
        if (!data.token) {
            return;
        }
        axios.defaults.headers.common["X-Auth-Token"] = data.token;
        Calls.authUserByToken({
            data: {token: data.token},
            done: (userData) => {
                this.setState((prevState) => {

                    const user = User.map(userData.data);
                    Authentication.user = user;

                    return {
                        authenticatedUser: user,
                    }
                });
            },
            fail: (userData) => {
                this.setState({authenticatedUser: null});
            }
        });
    }

    render3() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider
                    utils={MomentUtils}
                    moment={moment}
                    locale="cs"
                >
                    <Route path={"*"} exact={true}
                           render={props => (
                               Authentication.isAuthenticated() ?
                                   <SPAAuthenticated authenticatedUser={this.state.authenticatedUser}
                                                     match={props.match} history={props.history}/> :
                                   <SPAAuthenticated authenticatedUser={this.state.authenticatedUser}
                                                     match={props.match} history={props.history}/>
                           )}/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider
                    utils={MomentUtils}
                    moment={moment}
                    locale="cs"
                >
                    <Route path={"*"} exact={true}
                           render={props => (
                               Authentication.isAuthenticated() ?
                                   <SPAAuthenticated authenticatedUser={this.state.authenticatedUser}
                                                     match={props.match} history={props.history}/> :
                                   <SPANotAuthenticated authenticatedUser={this.state.user} match={props.match}
                                                        history={props.history}
                                                        onLoginDone={this.onLoginDone.bind(this)}/>
                           )}/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
