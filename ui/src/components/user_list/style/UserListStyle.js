import {darken, fade, lighten} from "@material-ui/core/styles/colorManipulator";

const Styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
        maxHeight: `calc(100vh - 171px)`,
        height: `calc(100vh - 171px)`
    },
    listSection: {
        backgroundColor: "inherit",
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0,
    },
    typography:{
        width: "100%",
    },
    input: {
        width: "100%",
        margin: theme.spacing.unit,
        marginLeft: 0
    },
    filterWrapper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 16px",
        borderBottom: `1px solid ${
            theme.palette.type === "light"
                ? lighten(fade(theme.palette.divider, 1), 0.88)
                : darken(fade(theme.palette.divider, 1), 0.8)
            }`
    }
});

export default Styles;