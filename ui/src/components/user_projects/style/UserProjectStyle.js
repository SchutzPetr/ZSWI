const Styles = theme => ({
    root: {
        maxHeight: `calc(100vh - 335px)`,
        height: `calc(100vh - 335px)`,
        overflow: "auto",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        //padding: theme.spacing.unit,
    },
    content:{
      padding: "0 5px"
    },
    titleCell:{
        minWidth: 150,
        padding: "0 5px",
        border: "1px solid rgba(224, 224, 224, 1)"
    },
    titleCell2Header:{
        padding: "0 5px",
        textAlign: "center"
    },
    titleCell2:{
        minWidth: 25,
        maxWidth: 30,
        padding: "0 5px",
        border: "1px solid rgba(224, 224, 224, 1)",
        textAlign: "center"
    }
});

export default Styles;