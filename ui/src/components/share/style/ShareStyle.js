const Styles = theme => ({
    root: {
        width: "100%",
        maxHeight: `calc(100vh - 64px - ${theme.spacing.unit * 2}px)`,
        height: `calc(100vh - 64px - ${theme.spacing.unit * 2}px)`
    },
    accountCircle: {
        color: "rgba(0, 0, 0, 0.54)",
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
        paddingLeft: 0,
    },
    tableCellCenter: {
        display: "flex",
        alignItems: "center",
    },
    tableCellCenterJustifi:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    tableHeaderFirst: {
        width: "70%"
    },
    tableHeaderSecond: {
        width: "30%",
        textAlign: "center"
    }
});

export default Styles;