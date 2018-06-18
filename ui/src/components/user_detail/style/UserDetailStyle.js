const Styles = theme => ({
    root: {
        display: 'flex',
        height: "100%",
        flexDirection: "column",
        justifyContent:"center",
        alignItems: "center",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        //padding: theme.spacing.unit,
    },
    empty:{
        height: 200
    },
    generateButton:{
        width: "100%",
        marginTop: 25
    }
});

export default Styles;