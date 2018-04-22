import SharedStyles from "../../shared/style/SharedStyle";

const Styles = theme => ({
    mainContainer: {
        ...SharedStyles(theme).mainContainer,
    },
    mainGrid:{
        padding: theme.spacing.unit * 1,
    },
});

export default Styles;