import React from "react";
import PropTypes from "prop-types";

import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/Grid/Grid";
import Login from "../../components/login/Login";
import withStyles from "@material-ui/core/styles/withStyles";
import Styles from "./style/LoginPageStyle";

class LoginPage extends React.Component {

    state = {
        loadFeedback: "ready"
    };

    onLogin = (dataIn, savePassworda, event) => {
        this.setState({loadFeedback: "loading"});
        Calls.login({
            data: dataIn,
            done: (data) => {
                this.props.onLoginDone(data.data, savePassworda);
                this.setState({loadFeedback: "ready"}, () => {
                    this.props.history.push("/")
                });
            },
            fail: (data) => {
                this.setState({loadFeedback: "ready"});
            }
        });
    };

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid}
                      container={true}
                      spacing={16}
                      alignItems={"center"}
                      direction={"row"}
                      justify={"center"}>
                    <Grid className={this.props.classes.secondGrid} item xs={12} sm={4}>
                        <Login onLogin={this.onLogin}/>
                    </Grid>
                </Grid>
            );
        } else {
            return <LinearProgressCentered paper={false}/>
        }
    }

    render() {
        return (
            <main className={this.props.classes.mainContainer}>
                {this._getContend()}
            </main>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    onLoginDone: PropTypes.func.isRequired

};

export default withStyles(Styles, {withTheme: true})(LoginPage);