import React from "react";
import PropTypes from "prop-types";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import UserDetail from "../../components/user_detail/UserDetail";
import Styles from "./style/HomeStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import UserProject from "../../components/user_projects/UserProject";
import Authentication from "./../../Authentication";
import {Grid} from "@material-ui/core/index";


class Home extends React.Component {

    state = {
        users: [],
        loadFeedback: "ready"
    };

    componentDidMount() {
        //this._fetchData();
    }

    _fetchData() {
        Calls.getUsers({
            data: {},
            done: (data) => {
                this.setState({users: data, loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        })
    }

    _getContend() {
        if (this.state.loadFeedback === "loading") {
            return <LinearProgressCentered paper={false}/>
        } else if (this.state.loadFeedback === "ready") {
            return (
                <Grid className={this.props.classes.mainGrid} container={true} spacing={16}>
                    <Grid item={true} xs={12} sm={3}>
                        <UserDetail user={Authentication.user}/>
                        <div className={this.props.classes.divider}/>
                        <UserProject/>
                    </Grid>
                    <Grid item={true} xs={12} sm={9}>
                        <AgendaTabs/>
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

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired

};

export default withStyles(Styles, {withTheme: true})(Home);
