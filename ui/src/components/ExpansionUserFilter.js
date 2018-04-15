import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "material-ui/styles";
import classNames from "classnames";
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    ExpansionPanelActions,
} from "material-ui/ExpansionPanel";
import Typography from "material-ui/Typography";
import ExpandMoreIcon from "material-ui-icons/ExpandMore";
import Chip from "material-ui/Chip";
import Button from "material-ui/Button";
import Divider from "material-ui/Divider";
import {darken, fade, lighten} from "material-ui/styles/colorManipulator";

const styles = theme => ({
    root: {
        flexGrow: 1,
        border: `1px solid ${
            theme.palette.type === "light"
                ? lighten(fade(theme.palette.divider, 1), 0.88)
                : darken(fade(theme.palette.divider, 1), 0.8)
            }`
    },
    noneShadow: {
        boxShadow: "none",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: "bottom",
        height: 20,
        width: 20,
    },
    details: {
        alignItems: "center",
    },
    column: {
        flexBasis: "33.33%",
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
});

class ExpansionUserFilter extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <ExpansionPanel className={classes.noneShadow}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <div className={classes.column}>
                            <Typography className={classes.heading}>Filtr</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>Nastavte si filtr</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        <div className={classes.column}/>
                        <div className={classes.column}>
                            <Chip label="Barbados" className={classes.chip} onDelete={() => {
                            }}/>
                        </div>
                        <div className={classNames(classes.column, classes.helper)}>
                            <Typography variant="caption">
                                Select your destination of choice<br/>
                                <a href="#sub-labels-and-columns" className={classes.link}>
                                    Learn more
                                </a>
                            </Typography>
                        </div>
                    </ExpansionPanelDetails>
                    <Divider/>
                    <ExpansionPanelActions>
                        <Button size="small">Cancel</Button>
                        <Button size="small" color="primary">
                            Save
                        </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}

ExpansionUserFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(ExpansionUserFilter);