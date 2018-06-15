import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/Grid/Grid";
import Styles from "./style/ManageHolidayPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import HolidayTable from "../../components/holiday_table/HolidayTable";
import HolidayRowRecord from "../../entity/HolidayRowRecord";
import User from "../../entity/User";

class ManageHolidayPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = ManageHolidayPage.getDerivedStateFromProps(props, {});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            users: prevState.users || [],
            user: nextProps.match.params.userId && prevState.users ? prevState.users.find(x => x.id === nextProps.match.params.userId) : null,
            year: nextProps.match.params.year ? Number(nextProps.match.params.year) : new Date().getFullYear(),
            loadFeedback: prevState.loadFeedback || "loading",
            data: prevState.data || []
        };
    }

    shouldComponentUpdate(newProps, newState, nextContext) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if ((prevState.user !== this.state.user) || (prevState.user && this.state.user && prevState.user.id !== this.state.user.id) || this.state.year !== prevState.year) {
            this._fetchUserHolidayData();
        }
    }

    componentDidMount() {
        this._fetchData();
        if (this.state.user) {
            this._fetchUserHolidayData();
        }
    }

    _fetchData() {
        this.setState({loadFeedback: "loading"});
        Calls.getUsers({
            data: {},
            done: (data) => {
                this.setState((prevState) => {

                    let users = User.map(data.data);

                    return {
                        users: users,
                        user: this.props.match.params.userId && users ? users.find(x => x.id === this.props.match.params.userId) : null,
                        loadFeedback:
                            "ready"
                    }
                });
            },
            fail: (data) => {
                this.setState({loadFeedback: "error"});
                //todo: error throw
            }
        });
    }

    _fetchUserHolidayData() {
        if (!this.state.user || !this.state.year) {
            return;
        }
        Calls.getUserHolidayByUserIdAndYear({
            data: {userId: this.state.user.id, year: this.state.year},
            done: (data) => {
                this.setState({data: HolidayRowRecord.map(data.data), loadFeedback: "ready"});
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
                                      year={this.state.year}
                                      users={this.state.users}
                                      data={this.state.data}
                                      rowsPerPage={10}
                                      rowsPerPageOptions={[]}
                                      onSelectChange={this.onSelectChange}
                                      onSelectAllChange={this.onSelectAllChange}
                                      onSaveDone={this._fetchUserHolidayData.bind(this)}
                                      mode={"SECRETARY"}
                        />
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
