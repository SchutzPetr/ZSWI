import React from "react";
import PropTypes from "prop-types";
import UserList from "../../components/user_list/UserList";
import AgendaTabs from "../../components/agenda/AgendaTabs";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "material-ui/es/Grid/Grid";

class AgendaOverview extends React.Component {

    state = {
        users: [],
        loadFeedback: "loading"
    };

    componentDidMount(){
        this._fetchData();
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
                        <UserList match={this.props.match} users={this.state.users}/>
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

AgendaOverview.propTypes = {
    match: PropTypes.object.isRequired
};


export default AgendaOverview;
export {AgendaOverview};