import React, {Component} from "react";
import "./index.css";
import Authentication from "./Authentication";
import SPAAuthenticated from "./spa/SPAAuthenticated";
import {MuiThemeProvider, createMuiTheme} from "material-ui/styles";
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {MuiPickersUtilsProvider} from "material-ui-pickers";
import axios from 'axios';
import SPANotAuthenticated from "./spa/SPANotAuthenticated";

const theme = createMuiTheme();

class App extends Component {

    constructor(props){
        super(props);

        moment.locale('cs');

        axios.defaults.baseURL = "localhost";
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider
                    utils={MomentUtils}
                    moment={moment}
                    locale="cs"
                >
                    {Authentication.isAuthenticated() ? <SPAAuthenticated/> : <SPANotAuthenticated/>}
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
