const Styles = theme => ({
    root: {
        margin: theme.spacing.unit,
        display: "inline-block"
    },
    fullHeightRoot: {
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
    tableHeader: {
        height: 100
    },
    flex: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: theme.spacing.unit
    },
    formControl: {
        minWidth: 200,
    },
    vertical: {
        transform: "rotate(-90deg)",
        webkitTransform: "rotate(-90deg)", /* Safari/Chrome */
        mozTransform: "rotate(-90deg)", /* Firefox */
        oTransform: "rotate(-90deg)", /* Opera */
        msTransform: "rotate(-90deg)",
    }
});

export default Styles;