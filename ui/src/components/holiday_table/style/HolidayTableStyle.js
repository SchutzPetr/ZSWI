const Styles = theme => ({
    root: {
        width: '100%',
        margin: theme.spacing.unit,
    },
    fullHeightRoot: {
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

export default Styles;