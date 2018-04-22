import SharedStyles from "../../shared/style/SharedStyle";

const Styles = theme => ({
    mainContainer: {
        ...SharedStyles(theme).mainContainer,
    },
    divider: {
        height: 8,
    },
    paper: {
        width: "100%",
        height: "100%"
    },
    mainGrid: {
        overflow: "auto",
        padding: theme.spacing.unit * 1,
    },
});

export default Styles;