const Styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        display: "inline-block"
    },
    fullHeightRoot:{
        overflow: "auto",
        maxHeight: `calc(100vh - 80px)`,
        height: `calc(100vh - 80px)`,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    flex:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: theme.spacing.unit
    },
    formControl:{
        minWidth: 200,
    }
});

export default Styles;