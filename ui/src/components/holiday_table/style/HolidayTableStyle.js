const Styles = theme => ({
    root: {
        width: '100%',
        margin: theme.spacing.unit,
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