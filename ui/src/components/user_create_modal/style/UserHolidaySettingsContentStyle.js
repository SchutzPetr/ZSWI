const Styles = theme => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
        margin: theme.spacing.unit,
        maxWidth: 808
    },
    expansionPanel:{
        width: "100%",
    },
    row:{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        alignItems: "center",
    },
    row2:{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "space-between",
        boxShadow: "0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
        margin: theme.spacing.unit,
    },
    row2Wrapper:{
        display: "flex",
        flexDirection: "column",
    },
    title: {
        margin: theme.spacing.unit,
        minWidth: 100
    },
    textField: {
        height: 60,
        margin: theme.spacing.unit,
    },
    datePicker:{
        width: 182,
        height: 60,
        margin: theme.spacing.unit,
    },
    textField2: {
        width: 160,
        height: 60,
        margin: theme.spacing.unit,
    },
    datePicker2:{
        width: 160,
        height: 60,
        margin: theme.spacing.unit,
    },
});

export default Styles;