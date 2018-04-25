const Styles = theme => ({
    root: {
        maxHeight: `calc(100vh - 312px)`,
        height: `calc(100vh - 312px)`,
        overflow: "auto",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        //padding: theme.spacing.unit,
    },
});

export default Styles;