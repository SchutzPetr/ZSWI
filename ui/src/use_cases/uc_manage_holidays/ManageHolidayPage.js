import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/es/Grid/Grid";
import Styles from "./style/ManageHolidayPageStyle";
import withStyles from "@material-ui/core/es/styles/withStyles";
import HolidayTable from "../../components/holiday_table/HolidayTable";
import HolidayRowRecord from "../../entity/HolidayRowRecord";
import User from "../../entity/User";

function createData() {
    let data = [];
    for (let i = 0; i < 25; i++) {
        data.push(new HolidayRowRecord(i, 1, new Date(), "ALL_DAY", false))
    }

    return data;
}

class ManageHolidayPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = ManageHolidayPage.getDerivedStateFromProps(props, {});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            users: prevState.users || [],
            user: nextProps.match.params.userId && prevState.users ? prevState.users.find(x => x.id === nextProps.match.params.userId) : null,
            loadFeedback: prevState.loadFeedback || "loading",
            data: prevState.data || []
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData() {
        this.setState({loadFeedback: "loading"});
        Calls.getUsers({
            data: {},
            done: (data) => {
                this.setState({users: User.map(data.data), loadFeedback: "ready"});
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    onSelectChange = (item, value) => {
        this.setState((prevState) => {
            let data = prevState.data;
            data.find(x => x.id === item.id).isSelected = value;
            return {
                data: data
            }
        });
    };

    onSelectAllChange = (value) => {
        this.setState((prevState) => {
            let data = prevState.data;
            data.forEach(x => {
                x.isSelected = value
            });
            return {
                data: data
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
                    <Grid item={true} xs={12} sm={12}>
                        <HolidayTable fullHeight={true}
                                      user={this.state.user}
                                      users={this.state.users}
                                      data={this.state.data}
                                      rowsPerPage={11}
                                      rowsPerPageOptions={[]}
                                      onSelectChange={this.onSelectChange}
                                      onSelectAllChange={this.onSelectAllChange}/>
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

ManageHolidayPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object

};

export default withStyles(Styles, {withTheme: true})(ManageHolidayPage);
