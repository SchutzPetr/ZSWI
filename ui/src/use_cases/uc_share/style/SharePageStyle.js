const Styles = theme => ({
    divider: {
        height: 8,
    },
    paper:{
        width: "100%",
        maxHeight: `calc(100vh - 64px - ${theme.spacing.unit * 2}px)`,
        height: `calc(100vh - 64px - ${theme.spacing.unit * 2}px)`
    }
});

export default Styles;