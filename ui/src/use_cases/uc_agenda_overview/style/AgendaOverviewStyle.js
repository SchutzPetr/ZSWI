import SharedStyles from "../../shared/style/SharedStyle";

const Styles = theme => ({
    mainContainer: {
        ...SharedStyles(theme).mainContainer,
    },
    mainGrid:{
        padding: theme.spacing.unit * 1,
    },
    divider: {
        height: 8,
    },
    projectRoot: {
        maxHeight: `calc(100vh - 450px)`,
        height: `calc(100vh - 450px)`,
        overflow: "auto",
    },
});

export default Styles;