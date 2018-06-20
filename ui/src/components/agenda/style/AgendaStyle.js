const rowHeightHeader = 24;
const rowHeight = 20;

const Styles = theme => ({
    root: {
        maxHeight: "calc(100vh - 115px)",
        height: "calc(100vh - 115px)",
        overflowX: "auto",
    },
    table: {
        minWidth: 700,
    },
    part: {
        borderBottom: "none",
        textAlign: "center",
        fontWeight: "bold",
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
        borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    centerHeaderText: {
        textAlign: "center",
    },
    saturday: {
        height: rowHeight,
        backgroundColor: "#f5eca7"
    },
    sunday: {
        height: rowHeight,
        backgroundColor: "#f5eca7"
    },
    holiday: {
        height: rowHeight,
        backgroundColor: "#c9e5c7"
    },
    thuTue: {
        height: rowHeight,
        backgroundColor: "#fafafb"
    },
    defRow: {
        height: rowHeight,
    },
    headerBorder: {
        border: "1px solid rgba(224, 224, 224, 1)",
        textAlign: "center",
    },
    headerLeftRight: {
        borderLeft: "1px solid rgba(224, 224, 224, 1)",
        borderRight: "1px solid rgba(224, 224, 224, 1)",
    },
    tableCell: {
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "none",
    },
    tableCellDate:{
        padding: "2px 24px",
        borderBottom: "none",
        minHeight: rowHeight,
        minWidth: 110
    },
    partTableCell: {
        paddingTop: 2,
        paddingBottom: 2,
        borderBottom: "none",
        textAlign: "center",
    },
    moreVert: {
        height: 18,
        width: 18,
    },
    menuButton: {
        height: 20,
        width: 20,
    },
    tableCellMenu: {
        width: 32,
    },
    headerRow: {
        height: rowHeightHeader,
    },
});

export default Styles;