const Styles = theme => ({
    root: {
        width: 480,
    },
    header: {
        display: 'flex',
        height: 48,
        backgroundColor: "#EEEEEE"
    },
    content: {
        height: 380,
        marginBottom: 20
    },
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

export default Styles;