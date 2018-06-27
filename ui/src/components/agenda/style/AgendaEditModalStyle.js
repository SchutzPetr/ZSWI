const Styles = theme => ({
    paper: {
        position: "absolute",
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    snackbar: {
        position: 'absolute',
    },
    snackbarClose: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
    expansionPanelDetails: {
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        //alignItems: "center",
    },
    switchEnable: {
        width: "100%"
    },
    formControl: {
        width: "100%",
    }
});

export default Styles;