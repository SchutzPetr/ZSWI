import SharedStyles from "../../shared/style/SharedStyle";

const Styles = theme => ({
    mainContainer: {
        ...SharedStyles(theme).mainContainer,
    },
    mainGrid: {
        height: "100%",
        padding: theme.spacing.unit * 1,
    },
    secondGrid: {
        height: "50%"
    }
});

export default Styles;