const drawerWidth = 240;

const Styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        maxHeight: "100vh",
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
    },
    flex: {
        flex: 1,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawerPaper: {
        position: "relative",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperMobile: {
        width: drawerWidth,
        [theme.breakpoints.up("md")]: {
            position: "relative",
        },
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    content: {
        position: "relative",
        top: 64,
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 1,
        height: "calc(100vh - " + ((theme.spacing.unit * 2) + 64) + "px)",
        maxHeight: "calc(100vh - " + ((theme.spacing.unit * 2) + 64) + "px)",
    },
    calendar: {
        height: "calc(100vh - 112px)",
        maxHeight: "calc(100vh - 112px)",
    },
    listItem: {
        maxHeight: 48
    },
    notifiButton:{
        margin: "0px 48px"
    }
});

export default Styles;