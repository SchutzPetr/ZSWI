const Styles = theme => ({
    mainContainer: {
        position: "relative",
        top: 64,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        height: "calc(100vh - " + 64 + "px)",
        maxHeight: "calc(100vh - " + 64 + "px)",
    }
});

export default Styles;