import React, {Component} from "react";
import "./index.css";
import Authentication from "./Authentication";
import Layout from "./layout/Layout";
import {MuiThemeProvider, createMuiTheme} from "material-ui/styles";

const theme = createMuiTheme();

class App extends Component {

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Layout/>
            </MuiThemeProvider>
        );
    }
}

export default App;
