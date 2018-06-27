const Styles = theme => ({
    root: {
        maxHeight: 462 - (8 * theme.spacing.unit),
        height: 462 - (8 * theme.spacing.unit),
        padding: 4 * theme.spacing.unit,
    },
    projectDetail: {
        marginTop: 2 * theme.spacing.unit,
    },
    text: {
        marginTop: theme.spacing.unit,
        textOverflow: "ellipsis",
        wordBreak: "break-all",
    },
    textScroll: {
        marginTop: theme.spacing.unit,
        textOverflow: "ellipsis",
        wordBreak: "break-all",
        maxHeight: 160,
        overflowY: "auto",
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    padding: {
        padding: 4 * theme.spacing.unit,
    },
    projectSelect: {
        width: "100%",
        marginTop: 2 * theme.spacing.unit,
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    root2: {
        display: "flex",
        height: 462,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    margin: {
        margin: theme.spacing.unit,
    },
    withoutLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    textField: {
        width: 250,
    },
    userIcon: {
        width: 48
    },
    loginButton: {
        width: 250,
        marginTop: 6 * theme.spacing.unit,

    }
});

export default Styles;