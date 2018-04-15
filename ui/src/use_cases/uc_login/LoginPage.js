import React from "react";
import PropTypes from "prop-types";

import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";
import Login from "../../components/login/Login";
import withStyles from "material-ui/es/styles/withStyles";
import Styles from "./style/LoginPageStyle";

class LoginPage extends React.Component {

    state = {
        users: [],
        loadFeedback: "ready"
    };

    onLogin = (dataIn, event) => {
        this.setState({loadFeedback: "loading"});
        Calls.login({
            data: dataIn,
            done: (data) => {
                this.setState({loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
            }
        });
    };

    render() {

        if(this.state.loadFeedback === "loading"){
            return <LinearProgressCentered paper={false}/>
        }else if(this.state.loadFeedback === "ready"){
            return (
                <Grid className={this.props.classes.rootGrid}
                    container spacing={16}
                      alignItems={"center"}
                      direction={"row"}
                      justify={"center"}>
                    <Grid className={this.props.classes.secondGrid} item xs={12} sm={3}>
                        <Login onLogin={this.onLogin}/>
                    </Grid>
                </Grid>
            );
        }else {
            return <LinearProgressCentered paper={false}/>
        }
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired

};

export default withStyles(Styles, {withTheme: true})(LoginPage);