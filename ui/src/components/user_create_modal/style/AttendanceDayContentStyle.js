const Styles = theme => ({
    root: {
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
        marginBottom: theme.spacing.unit,
    },
    firstRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: theme.spacing.unit,
    },
    secondRow: {
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing.unit,
    },
    switch: {},
    datePicker: {
        marginLeft: "auto"
    },
    title: {
        margin: theme.spacing.unit,
        paddingRight: 2 * theme.spacing.unit,
        minWidth: 100
    },
    textField: {
        margin: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    select: {
        minWidth: 182
    },
    timePicker: {
        width: 182,
        margin: theme.spacing.unit,
    },
});

export default Styles;