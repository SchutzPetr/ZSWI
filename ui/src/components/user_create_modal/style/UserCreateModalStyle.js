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