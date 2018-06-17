const Styles = theme => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //flexWrap: 'wrap',
        width: 500
    },
    row:{
        margin: "20px 10px",
        width: 480
    },
    datePicker:{
        margin: "20px 10px",
        width: 230
    },
    fullWidth:{
      width: "100%"
    },
    formRow: {
        display: "flex",
        flexWrap: "wrap",
        margin: theme.spacing.unit,
    },
    textField: {
        margin: theme.spacing.unit,
        minWidth: 230,
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