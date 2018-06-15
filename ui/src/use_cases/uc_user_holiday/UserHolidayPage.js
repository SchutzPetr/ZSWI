import React from "react";
import PropTypes from "prop-types";
import Calls from "../../Calls";
import LinearProgressCentered from "../../components/LinearProgressCentered";
import Grid from "@material-ui/core/Grid/Grid";
import Styles from "./style/UserHolidayPageStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import HolidayTable from "../../components/holiday_table/HolidayTable";
import User from "../../entity/User";
import HolidayRowRecord from "../../entity/HolidayRowRecord";

class UserHolidayPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = UserHolidayPage.getDerivedStateFromProps(props, {});
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            year: nextProps.match.params.year ? Number(nextProps.match.params.year) : new Date().getFullYear(),
            loadFeedback: prevState.loadFeedback || "loading",
            data: prevState.data || []
        };
    }

    shouldComponentUpdate(newProps, newState, nextContext) {
        return true;
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.props.authenticatedUser && !prevProps.authenticatedUser || this.state.year !== prevState.year) {
            this._fetchUserHolidayData();
        }
    }

    componentDidMount() {
        if (this.props.authenticatedUser) {
            this._fetchUserHolidayData();
        }
    }

    _fetchUserHolidayData() {
        if (!this.props.authenticatedUser || !this.state.year) {
            return;
        }
        Calls.getUserHolidayByUserIdAndYear({
            data: {userId: this.props.authenticatedUser.id, year: this.state.year},
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
                                      user={this.props.authenticatedUser}
                                      year={this.state.year}
                                      users={[this.props.authenticatedUser]}
                                      data={this.state.data}
                                      rowsPerPage={10}
                                      rowsPerPageOptions={[]}
                                      onSelectChange={this.onSelectChange}
                                      onSelectAllChange={this.onSelectAllChange}
                                      onSaveDone={this._fetchUserHolidayData.bind(this)}
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

UserHolidayPage.propTypes = {
    classes: PropTypes.object.isRequired,
    match: PropTypes.object,
    authenticatedUser: PropTypes.instanceOf(User)

};

export default withStyles(Styles, {withTheme: true})(UserHolidayPage);
