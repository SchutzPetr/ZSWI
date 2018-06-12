const ITEM_HEIGHT = 48;

const Styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
    },
    tabs: {
        width: "90%",
        height: 35,
        minHeight: 35
    },
    tab: {
        width: "8.333333333333333%",
        minWidth: "8.333333333333333%",
        maxWidth: "8.333333333333333%",
        height: 35
    },
    yearButton: {
        width: "5%",
        minWidth: "5%",
        maxWidth: "5%",
    },
    indicator: {
        height: 3
    },
    loadingPaper: {
        maxHeight: "calc(100vh - 115px)",
        height: "calc(100vh - 115px)",

    },
    loading: {
        top: "50%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
        width: "80%"
    },
    bottom:{
        display: "flex"
    }
});

export default Styles;