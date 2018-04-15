import React from "react";
import PropTypes from "prop-types";
import UserList from "../../components/user_list/UserList";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";
import UserDetail from "../../components/user_detail/UserDetail";
import Styles from "./style/HomeStyle";
import withStyles from "material-ui/es/styles/withStyles";
import UserProject from "../../components/user_projects/UserProject";

class Home extends React.Component {

    state = {
        users: [],
        loadFeedback: "ready"
    };

    componentDidMount(){
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

    render() {

        if(this.state.loadFeedback === "loading"){
            return <LinearProgressCentered paper={false}/>
        }else if(this.state.loadFeedback === "ready"){
            return (
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={3}>
                        <UserDetail/>
                        <div className={this.props.classes.divider}/>
                        <UserProject/>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <AgendaTabs/>
                    </Grid>
                </Grid>
            );
        }else {
            return <LinearProgressCentered paper={false}/>
        }
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired

};

export default withStyles(Styles, {withTheme: true})(Home);
