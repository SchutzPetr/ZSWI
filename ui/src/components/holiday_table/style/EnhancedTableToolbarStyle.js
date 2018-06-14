import {lighten} from "@material-ui/core/styles/colorManipulator";

const Styles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    wrapper:{
        width: "100%",
        display: "flex",
    },
    singleSelect: {
        paddingTop: 14,
        width: "100%"
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    formControl:{
        width: 100,
        marginRight: 5 * theme.spacing.unit,
        marginLeft: 5 * theme.spacing.unit,
    }
});
export default Styles;