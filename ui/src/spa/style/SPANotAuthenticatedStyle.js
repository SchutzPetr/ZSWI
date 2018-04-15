const Styles = theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    content: {
        position: "relative",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 1,
        height: "calc(100vh - " + ((theme.spacing.unit * 2) + 64) + "px)",
        maxHeight: "calc(100vh - " + ((theme.spacing.unit * 2) + 64) + "px)",
    },
});

export default Styles;