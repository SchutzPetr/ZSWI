import SharedStyles from "../../shared/style/SharedStyle";

const Styles = theme => ({
    mainContainer: {
        ...SharedStyles(theme).mainContainer,
        width: "calc(100vw - 73px)",
        overflow: "auto",
    },
    divider: {
        height: 8,
    },
    paper: {
        width: "100%",
        height: "100%"
    },
    mainGrid: {
        maxHeight: `calc(100vh - 80px)`,
        height: `calc(100vh - 80px)`,
        padding: theme.spacing.unit * 1,
    },
    secondGrid: {
        height: "100%",
        margin: 0
    }
});

export default Styles;