const Styles = theme => ({
    root: {
        margin: theme.spacing.unit,
    },
    empty:{
        maxHeight: 462,// - (8 * theme.spacing.unit),
        height: 462,// - (8 * theme.spacing.unit),
    },
    fullHeightRoot:{
        overflow: "auto",
        maxHeight: `calc(100vh - 80px)`,
        height: `calc(100vh - 80px)`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    }
});

export default Styles;