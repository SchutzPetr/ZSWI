import React from "react";
import "./index.css";
import Authentication from "./Authentication";
import Observer from "./Observer";
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

        axios.defaults.baseURL = "localhost";
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        this.state = {
            authenticated: Authentication.isAuthenticated()
        };
    }

    componentDidMount() {
        Observer.registerListener("AuthenticationChangeEvent", () => {
            this.setState({authenticated: Authentication.isAuthenticated()});
        });

        Calls.getUser({
            data: {id: 3},
            done: (data) => {
                this.setState((prevState) => {
                    return {
                        authenticatedUser: User.map(data.data),
                    }
                });
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
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
                                                        history={props.history}/>
                           )}/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
