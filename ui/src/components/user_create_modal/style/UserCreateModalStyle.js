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
        width: "100%",
        flexWrap: "wrap",
        margin: theme.spacing.unit,
    },
    formRow2:{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        margin: theme.spacing.unit,
        alignItems: "center",
    },
    textField: {
        height: 60,
        margin: theme.spacing.unit,
    },
    statusSwitchWrapper:{
        margin: theme.spacing.unit,
        minWidth: 182
    },
    statusSwitchLabel:{
        marginTop: 0
    },
    statusSwitch:{
        //marginLeft: -theme.spacing.unit,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        height: 60,
    },
    select: {
        minWidth: 182
    },
    timePickerTitle:{
        margin: theme.spacing.unit,
        alignSelf: "flex-start"
    },
    datePicker:{
        width: 182,
        height: 60,
        margin: theme.spacing.unit,
    },
});

export default Styles;