const Styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //flexWrap: 'wrap',
    },
    formRow: {
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing.unit,
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
    }
});

export default Styles;