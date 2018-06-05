import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/es/Grid/Grid";
import Styles from "./style/SharePageStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import SharedWithMe from "../../components/share/SharedWithMe";
import SharedWithOthers from "../../components/share/SharedWithOthers";
import Share from "../../components/share/Share";

class SharePage extends React.Component {

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
                    <Grid item={true} xs={12} sm={4}>
                        <SharedWithMe/>
                    </Grid>
                    <Grid item={true} xs={12} sm={4}>
                        <SharedWithOthers/>
                    </Grid>
                    <Grid item={true} xs={12} sm={4}>
                        <Share/>
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

SharePage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object

};

export default withStyles(Styles, {withTheme: true})(SharePage);
