import SharedStyles from "../../shared/style/SharedStyle";

const Styles = theme => ({
    mainContainer: {
        ...SharedStyles(theme).mainContainer,
        overflowY: "scroll",
        top: 0
    },
    mainGrid: {
        height: "100%",
        padding: theme.spacing.unit * 1,
    },
    secondGrid: {
    }
});

export default Styles;