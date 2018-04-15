import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import Styles from "./style/LinearProgressCenteredStyle";
import LinearProgress from "material-ui/es/Progress/LinearProgress";
import Paper from "material-ui/es/Paper/Paper";

class LinearProgressCentered extends React.Component {

    render() {
        if(this.props.paper){
            return (
                <Paper className={this.props.classes.root}><LinearProgress className={this.props.classes.linearLoading}/></Paper>
            );
        }else{
            return (
                <div className={this.props.classes.root}><LinearProgress className={this.props.classes.linearLoading}/></div>
            );
        }
    }
}

LinearProgressCentered.propTypes = {
    classes: PropTypes.object.isRequired,
    paper: PropTypes.bool
};

LinearProgressCentered.defaultProps = {
    paper: true,
};

export default withStyles(Styles, {withTheme: true})(LinearProgressCentered);