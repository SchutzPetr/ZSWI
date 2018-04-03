import React, {Component} from "react";
import "./index.css";
import Authentication from "./Authentication";
import Layout from "./layout/Layout";
import {MuiThemeProvider, createMuiTheme} from "material-ui/styles";
import moment from 'moment';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import {MuiPickersUtilsProvider} from "material-ui-pickers";

moment.locale('cs');

const theme = createMuiTheme();

class App extends Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider
                    utils={MomentUtils}
                    moment={moment}
                    locale="cs"
                >
                    <Layout/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

export default App;
