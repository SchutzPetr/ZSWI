const Styles = theme => ({
    root: {
        display: 'flex',
        height: "100%",
        flexDirection: "column",
        justifyContent:"center",
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
    loginButton:{
        width: 250,
        marginTop: 6* theme.spacing.unit,

    }
});

export default Styles;