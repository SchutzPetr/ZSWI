const Styles = theme => ({
    root: {
        display: 'flex',
        height: "100%",
        minHeight: 380,
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
        margin: 50
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

    },
    rememberSwitchWrapper:{
        margin: theme.spacing.unit,
        minWidth: 250
    },
    rememberSwitchLabel:{
        marginTop: 0
    },
    rememberSwitch:{
        //marginLeft: -theme.spacing.unit,
    },
});

export default Styles;