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

        axios.defaults.headers.post["Content-Type"] = "application/json";

        this.state = {
            authenticatedUser: null
        };
    }

    componentDidMount() {
        fetch('./config.json').then(r => r.json()).then(json => {
            axios.defaults.baseURL = json.API_URL;
            if(Authentication.getToken()){
                this.authUserByToken(Authentication.getToken());
            }
            this.setState({config: json});
        });
    }

    onLoginDone(data) {
        if (!data.token) {
            return;
        }
        this.authUserByToken(data.token);
    }

    onLogout(){
        Authentication.user = null;
        Authentication.clearToken();
        this.setState({authenticatedUser: null});
    }

    authUserByToken(token){
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
                    Authentication.saveToken(token);

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

    render4() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider
                    utils={MomentUtils}
                    moment={moment}
                    locale="cs"
                >
                    <Route path={"*"} exact={true}
                           render={props => {
                               if (!this.state.config) {
                                   return null;
                               } else {
                                   if (Authentication.isAuthenticated()) {
                                       return <SPAAuthenticated authenticatedUser={this.state.authenticatedUser}
                                                                match={props.match} history={props.history}/>
                                   } else {
                                       return <SPAAuthenticated authenticatedUser={this.state.authenticatedUser}
                                                                match={props.match} history={props.history}/>
                                   }
                               }
                           }}/>
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
                           render={props => {
                               if (!this.state.config) {
                                   return null;
                               } else {
                                   if (Authentication.isAuthenticated()) {
                                       return <SPAAuthenticated authenticatedUser={this.state.authenticatedUser}
                                                                match={props.match} history={props.history} onLogout={this.onLogout.bind(this)}/>
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

export default App;
