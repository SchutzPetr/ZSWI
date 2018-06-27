import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles/index";
import Styles from "./style/LinearProgressCenteredStyle";
import {LinearProgress, Paper} from "@material-ui/core/index";

class LinearProgressCentered extends React.Component {

    render() {
        if(this.props.paper){
            return (
                <Paper className={this.props.fullPage ? this.props.classes.fullPage : this.props.classes.root}><LinearProgress className={this.props.classes.linearLoading}/></Paper>
            );
        }else{
            return (
                <div className={this.props.fullPage ? this.props.classes.fullPage : this.props.classes.root}><LinearProgress className={this.props.classes.linearLoading}/></div>
            );
        }
    }
}

LinearProgressCentered.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool,
    fullPage: PropTypes.bool
};

LinearProgressCentered.defaultProps = {
    paper: true,
    fullPage: false
};

export default withStyles(Styles, {withTheme: true})(LinearProgressCentered);