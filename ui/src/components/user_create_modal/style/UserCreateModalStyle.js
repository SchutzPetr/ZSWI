const Styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 808
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
    switch:{
        marginLeft: -theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    select: {
        minWidth: 182
    },
    timePickerTitle:{
        margin: 2*theme.spacing.unit,
        alignSelf: "flex-start"
    },
    timePicker:{
        width: 182,
        margin: theme.spacing.unit,
    },
});

export default Styles;